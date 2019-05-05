import { parseType, FieldDefinitionNode } from 'graphql'
import { composeTransforms } from 'graphql-tools/dist/transforms/transforms'

import { FieldTransform, getTypeName } from '../../lib/transform'

/*
 * Normalize connections to avoid empty edges/nodes (not realistic).
 */
const transformEdgesFields = new FieldTransform('edges', /Connection$/u, (field, { builder }) => {
  const name = getTypeName(field.type)

  return builder.buildField({
    ...field.astNode as FieldDefinitionNode,
    type: parseType(`[${name}!]!`),
  })
})

const transform = composeTransforms(transformEdgesFields)

export { transform }
