/**
 * Adapted from apollo-link-state/utils.ts
 */
import { DocumentNode, DirectiveNode } from 'graphql'

import { checkDocument, removeDirectivesFromDocument } from 'apollo-utilities'
import removeUnusedVariables from './removeUnusedVariables'

const connectionRemoveConfig = {
  test: (directive: DirectiveNode) => directive.name.value === 'rest',
  remove: true
}

const removed = new Map()
export default function removeRestDirective (
  query: DocumentNode
): DocumentNode | null {
  const cached = removed.get(query)
  if (cached) return cached
  checkDocument(query)
  const docClone = removeDirectivesFromDocument([connectionRemoveConfig], query)
  removed.set(query, docClone)
  return docClone ? removeUnusedVariables(docClone) : null
}
