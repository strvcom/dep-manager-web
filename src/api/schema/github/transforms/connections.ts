import { parseType, FieldDefinitionNode } from 'graphql'
import { FieldTransform, getTypeName } from '../../lib/transform'

/*
 * Normalize connections to avoid empty edges (not realistic).
 */
const transformEdgesFields = new FieldTransform('edges', /Connection$/u, (field, { builder }) =>
  builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`[${getTypeName(field.type)}!]!`),
  })
)

/*
 * Normalize connections to avoid empty nodes (not realistic).
 */
const transformNodesFields = new FieldTransform('nodes', /Connection$/u, (field, { builder }) =>
  builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`[${getTypeName(field.type)}!]!`),
  })
)

/*
 * Normalize edges to avoid empty node (not realistic).
 */
const transformNodeFields = new FieldTransform('node', /Edge$/u, (field, { builder }) =>
  builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`${getTypeName(field.type)}!`),
  })
)

const transforms = [transformEdgesFields, transformNodesFields, transformNodeFields]

export { transforms }
