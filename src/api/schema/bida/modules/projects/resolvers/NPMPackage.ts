import gql from 'graphql-tag'
import { pipe, pathOr, any, pathEq } from 'ramda'

import { projects } from './Query'

const dependentsSelection = gql`
  fragment RepositoryDependencies on SearchResultItemConnection {
    edges {
      node {
        ... on Repository {
          npmPackage {
            dependencies {
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
 * NPMPackage::dependents
 *
 * Resolves the STRV repositories that depend on a given package.
 *
 * Currently, we rely on querying the repositorie's package.json and
 * manually iterating each to look for dependencies on the root package.
 * This is not performatic at all. The APIs we have cannot resolve these
 * scenarios efficiently, so we definitely should move this code to an API
 * of our own, with a proper caching data-layer.
 *
 * @ALERT do NOT rely on pagination info when using this field!
 */
const dependents = {
  fragment: `... on NPMPackage { name }`,
  resolve: async ({ name }: any, args: any, context: any, info: any) => {
    // selection grafting
    info.fieldNodes[0].selectionSet.selections.push(dependentsSelection)

    // resut Query::projects delegation logic.
    const connection = await projects(null, args, context, info)

    // find dependent edges.
    connection.edges = connection.edges.filter(
      pipe(
        pathOr([], ['node', 'npmPackage', 'dependencies']),
        any(pathEq(['package', 'name'], name))
      )
    )

    // "fix" counts.
    connection.repositoryCount = connection.edges.length

    // cleanup grafted selection.
    info.fieldNodes[0].selectionSet.selections.pop()

    return connection
  }
}

export { dependents }
