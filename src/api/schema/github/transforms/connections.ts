import { parseType, GraphQLSchema, GraphQLObjectType } from 'graphql'
import { ASTDefinitionBuilder } from 'graphql/utilities/buildASTSchema'
import { visitSchema, VisitSchemaKind } from 'graphql-tools/dist/transforms/visitSchema'
import { composeTransforms } from 'graphql-tools/dist/transforms/transforms'

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

/**
 * Extract type name from type expression.
 */
const getTypeName = (type: string) => {
  const matched = type.match(/([a-z]*)/giu)

  if (!matched) {
    throw new Error(`Could not resolve type name from "${type}"`)
  }

  return matched[1]
}

/*
 * Normalize connections to avoid empty edges/nodes (not realistic).
 */
const transformEdgesFields = {
  transformSchema: (schema: GraphQLSchema) => {
    const builder = getBuilder(schema)

    return visit(schema, {
      [VisitSchemaKind.OBJECT_TYPE]: (type: GraphQLObjectType): GraphQLObjectType => {
        if (type.name.match(/Connection$/u)) {
          const config = type.toConfig()
          // parseType

          if (!config.fields.edges) {
            return type
          }

          const name = getTypeName(config.fields.edges.type.toString())

          config.fields.edges = builder.buildField({
            ...config.fields.edges.astNode,
            type: parseType(`[${name}!]!`),
          })

          return new GraphQLObjectType(config)
        }

        return type
      },
    })
  },
}

const transform = composeTransforms(transformEdgesFields)

export { transform }
