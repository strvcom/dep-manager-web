import {
  DocumentNode,
  SelectionSetNode,
  FieldNode,
  SelectionNode,
  ValueNode,
  VariableNode
} from 'graphql'

import { cloneDeep, getOperationDefinitionOrDie } from 'apollo-utilities'
import prop from 'ramda/es/prop'

export default function removeUnusedArguments (
  query: DocumentNode
): DocumentNode {
  const clone = cloneDeep(query)
  const definitions = getOperationDefinitionOrDie(clone)
  if (
    definitions.variableDefinitions &&
    definitions.variableDefinitions.length
  ) {
    const variables = variablesFromSelectionSet(definitions.selectionSet)
    const nextVariablesDefinitions = definitions.variableDefinitions.filter(
      ({ variable }) => variables.has(variable.name.value)
    )
    // readonly shit
    ;(definitions.variableDefinitions as any) = nextVariablesDefinitions
  }

  return clone
}

function variablesFromSelectionSet (
  { selections }: SelectionSetNode,
  variables: Set<string> = new Set()
): Set<string> {
  if (selections.length) {
    for (const field of selections) {
      if (!isField(field)) continue
      if (field.arguments && field.arguments.length) {
        field.arguments
          .map(prop('value'))
          .forEach(
            variable =>
              isVariable(variable) && variables!.add(variable.name.value)
          )
      }
      if (field.selectionSet) {
        return variablesFromSelectionSet(field.selectionSet, variables)
      }
    }
  }
  return variables
}

function isField (node: SelectionNode): node is FieldNode {
  return node.kind === 'Field'
}

function isVariable (node: ValueNode): node is VariableNode {
  return node.kind === 'Variable'
}
