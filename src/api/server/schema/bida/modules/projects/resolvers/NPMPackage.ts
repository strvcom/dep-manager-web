import {
  visit,
  ASTNode,
  FieldNode,
  InlineFragmentNode,
  FragmentSpreadNode,
  SelectionNode,
  FragmentDefinitionNode,
} from 'graphql/language'
import gql from 'graphql-tag'

import {
  any,
  append,
  both,
  lensPath,
  lensProp,
  over,
  pathEq,
  pathOr,
  propEq,
  pipe,
  set,
} from 'ramda'

import * as GT from '~generated/types'
import { Query } from './Query'

const RepositoryDependencies = gql`
  fragment RepositoryDependencies on SearchResultItemConnection {
    edges {
      node {
        ... on Repository {
          name
          npmPackage {
            dependencies {
              version
              package {
                name
              }
            }
          }
        }
      }
    }
  }
`.definitions[0] as FragmentDefinitionNode

const dependentsSelection = RepositoryDependencies.selectionSet.selections[0]

/**
 * Verifies if an edge depends on a given library.
 *
 * @param name Dependence library name
 */
const dependsOn = (name: string) =>
  pipe(pathOr([], ['node', 'npmPackage', 'dependencies']), any(pathEq(['package', 'name'], name)))

/**
 * Normalize a Repository edge into an Dependent edge (with meta-data info)
 */
const edgeToDependent = (name: string, version: string) => ({
  cursor,
  node,
}: GT.SearchResultItemEdge) => ({
  cursor,
  node: {
    __typename: 'Dependent' as const,
    __parent: { name, version },
    repository: node as GT.Repository,
  },
})

/**
 * Verifies if an AST node is a Dependent::repository field.
 */
const isRepositoryField = both(propEq('kind', 'Field'), pathEq(['name', 'value'], 'repository'))

/**
 * An AST visitor to adapt request of dependents field on-to GitHub search
 * API requirements.
 *
 * We use ramda on returns to benefit from immutability when altering the AST.
 */
const visitor = {
  /**
   * Alter the selectionSet for the dependents field to include necessary
   * data on the Repository (package.json blob, for instance).
   */
  leave: (node: ASTNode, key: string, parentNode: FieldNode) => {
    if (node.kind === 'SelectionSet' && parentNode.name && parentNode.name.value === 'dependents') {
      return over(lensProp('selections'), append(dependentsSelection), node)
    }
  },

  /**
   * Find the Dependent::repository field when present, and adapt it's
   * selectionSet into GitHub's expectation for Repository type.
   */
  InlineFragment: {
    leave: (node: InlineFragmentNode): InlineFragmentNode | null | undefined => {
      if (node.typeCondition && node.typeCondition.name.value === 'Dependent') {
        const selections = node.selectionSet.selections.filter(isRepositoryField) as FieldNode[]

        // skip this Dependent fragment entirely, when not
        // requesting repository data.
        if (!selections.length) return null

        const selectionSet = {
          kind: 'SelectionSet',
          selections: selections.flatMap(
            pathOr<ReadonlyArray<SelectionNode>>([], ['selectionSet', 'selections'])
          ),
        }
        return pipe(
          set(lensPath(['typeCondition', 'name', 'value']), 'Repository'),
          set(lensProp('selectionSet'), selectionSet)
        )(node)
      }
    },
  },
}

interface NPMPackage {
  name: string
  version: string
  dependencies: Array<{
    name: string
    version: string
  }>
}

// @tests
export { Query, dependsOn, edgeToDependent, isRepositoryField, visitor }

const NPMPackage: GT.NPMPackageResolvers = {
  /**
   * NPMPackage::dependents
   *
   * Resolves the STRV repositories that depend on a given package.
   *
   * Currently, we rely on querying the repositories' package.json and
   * manually iterating each to look for dependencies on the root package.
   * This is not performatic at all. The APIs we have cannot resolve these
   * scenarios efficiently.
   *
   * @ALERT do NOT rely on pagination info when using this field!
   */
  dependents: {
    fragment: `... on NPMPackage { name version }`,
    resolve: async ({ name, version }, args, context, info) => {
      /**
       * Find the Dependent named fragments and transform into inline fragments.
       */
      const inlinedFragments = visit((info.fieldNodes as unknown) as FieldNode, {
        FragmentSpread: {
          leave: (node: FragmentSpreadNode): InlineFragmentNode | null | undefined => {
            const fragment = info.fragments[node.name.value]

            if (fragment.typeCondition && fragment.typeCondition.name.value === 'Dependent') {
              const { name: ignored1, loc: ignored2, ...fragmentNode } = fragment

              return { ...fragmentNode, kind: 'InlineFragment' }
            }
          },
        },
      })

      // transform request selection.
      const fieldNodes = visit(inlinedFragments, visitor)

      // reuse Query::projects delegation logic.
      const projectsConnection = await Query.projects({}, args, context, {
        ...info,
        fieldNodes,
      })

      // find dependent edges.
      const edges = projectsConnection!
        .edges!.filter((edge): edge is GT.SearchResultItemEdge => !!edge)
        .filter(dependsOn(name!))
        .map(edgeToDependent(name!, version!))

      // "fix" counts.
      const repositoryCount = edges.length

      return { edges, repositoryCount }
    },
  },
}

export { NPMPackage }
