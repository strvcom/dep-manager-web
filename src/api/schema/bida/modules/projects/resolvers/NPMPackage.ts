import { visit } from 'graphql/language'
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
  set
} from 'ramda'

import { Query } from './Query'

const dependentsSelection = gql`
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
`.definitions[0].selectionSet.selections[0]

/**
 * Verifies if an edge depends on a given library.
 *
 * @param name Dependence library name
 */
const dependsOn = (name: string): boolean =>
  pipe(
    pathOr([], ['node', 'npmPackage', 'dependencies']),
    any(pathEq(['package', 'name'], name))
  )

/**
 * Normalize a Repository edge into an Dependent edge (with meta-data info)
 */
const edgeToDependent = (name: string, version: string) => ({
  cursor,
  node
}: any) => ({
  cursor,
  node: {
    __typename: 'Dependent',
    __parent: { name, version },
    repository: node
  }
})

/**
 * Verifies if an AST node is a Dependent::repository field.
 */
const isRepositoryField = both(
  propEq('kind', 'Field'),
  pathEq(['name', 'value'], 'repository')
)

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
  leave: (node: any, key: string, parent: any, path: any) => {
    if (
      node.kind === 'SelectionSet' &&
      parent.name &&
      parent.name.value === 'dependents'
    ) {
      return over(lensProp('selections'), append(dependentsSelection), node)
    }
  },

  /**
   * Find the Dependent::repository field when present, and adapt it's
   * selectionSet into GitHub's expectation for Repository type.
   */
  InlineFragment: {
    leave: (node: any, key: any, path: any) => {
      if (node.typeCondition.name.value === 'Dependent') {
        const selection = node.selectionSet.selections.find(isRepositoryField)

        // skip this Dependent fragment entirely, when not
        // requesting repository data.
        if (!selection) return null

        return pipe(
          set(lensPath(['typeCondition', 'name', 'value']), 'Repository'),
          set(lensProp('selectionSet'), selection.selectionSet)
        )(node)
      }
    }
  }
}

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
const dependents = {
  fragment: `... on NPMPackage { name version }`,
  resolve: async (
    { name, version }: any,
    args: any,
    context: any,
    info: any
  ) => {
    // transform request selection.
    const fieldNodes = visit(info.fieldNodes, visitor)

    // reuse Query::projects delegation logic.
    const connection = await Query.projects(null, args, context, {
      ...info,
      fieldNodes
    })

    // find dependent edges.
    connection.edges = connection.edges
      .filter(dependsOn(name))
      .map(edgeToDependent(name, version))

    // "fix" counts.
    connection.repositoryCount = connection.edges.length

    return connection
  }
}

export const NPMPackage = { dependents }
