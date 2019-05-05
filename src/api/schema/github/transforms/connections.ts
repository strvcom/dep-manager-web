import { parseType, FieldDefinitionNode } from 'graphql'
import { composeTransforms } from 'graphql-tools/dist/transforms/transforms'

import { FieldTransform, getTypeName } from '../../lib/transform'

/*
 * Normalize connections to avoid empty edges (not realistic).
 */
const transformEdgesFields = new FieldTransform('edges', /Connection$/u, (field, { builder }) => {
  const name = getTypeName(field.type)

  return builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`[${name}!]!`),
  })
})

/*
 * Normalize connections to avoid empty nodes (not realistic).
 */
const transformNodesFields = new FieldTransform('nodes', /Connection$/u, (field, { builder }) => {
  const name = getTypeName(field.type)

  return builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`[${name}!]!`),
  })
})

/*
 * Normalize edges to avoid empty node (not realistic).
 */
const transformNodeFields = new FieldTransform('node', /Edge$/u, (field, { builder }) =>
  builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`${getTypeName(field.type)}!`),
  })
)

const transform = composeTransforms(transformEdgesFields, transformNodesFields, transformNodeFields)

export { transform }
