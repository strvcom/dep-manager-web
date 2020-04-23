import { GraphQLSchema, GraphQLObjectType, GraphQLFieldConfig, GraphQLOutputType } from 'graphql'
import { ASTDefinitionBuilder } from 'graphql/utilities/buildASTSchema'
import { visitSchema, VisitSchemaKind } from 'graphql-tools'

// type normalization

type SchemaVisitor = { [key: string]: TypeVisitor }
type TypeVisitor = (type: GraphQLObjectType, schema: GraphQLSchema) => GraphQLObjectType

const visit = visitSchema as (schema: GraphQLSchema, visitor: SchemaVisitor) => GraphQLSchema

/**
 * Generate an AST builder based on an existing schema.
 */
const getBuilder = (schema: GraphQLSchema) =>
  // @ts-ignore ASTDefinitionBuilder is wrongly typed in @types/graphql.
  new ASTDefinitionBuilder({}, name => schema.getType(name))

export type FieldConfig = GraphQLFieldConfig<unknown, unknown>

type FieldTransformHandler = (
  field: FieldConfig,
  context: {
    type: GraphQLObjectType
    builder: ASTDefinitionBuilder
  }
) => FieldConfig

class FieldTransform {
  public typeName: RegExp
  public name: RegExp
  public fieldTransform: FieldTransformHandler

  public constructor(
    name: string | RegExp,
    typeName: string | RegExp,
    fieldTransform: FieldTransformHandler
  ) {
    this.name = typeof name === 'string' ? new RegExp(`^${name}$`, 'u') : name
    this.typeName = typeof typeName === 'string' ? new RegExp(`^${typeName}$`, 'u') : typeName
    this.fieldTransform = fieldTransform
  }

  public transformSchema(schema: GraphQLSchema) {
    const builder = getBuilder(schema)

    return visit(schema, {
      [VisitSchemaKind.OBJECT_TYPE]: (type: GraphQLObjectType): GraphQLObjectType => {
        if (type.name.match(this.typeName)) {
          const config = type.toConfig()
          // parseType

          for (let fieldName in config.fields) {
            if (fieldName.match(this.name)) {
              config.fields[fieldName] = this.fieldTransform(config.fields[fieldName], {
                type,
                builder,
              })
            }
          }

          return new GraphQLObjectType(config)
        }

        return type
      },
    })
  }
}

/**
 * Extract type name from type expression.
 */
const getTypeName = (type: GraphQLOutputType) => {
  const name = type.toString()
  const matched = name.match(/([a-z]+)/giu)

  if (!matched) {
    throw new Error(`Could not resolve type name from "${name}"`)
  }

  return matched[0]
}

export { FieldTransform, getTypeName }
