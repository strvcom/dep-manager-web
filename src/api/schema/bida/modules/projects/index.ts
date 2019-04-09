import gql from 'graphql-tag'
import { pipe, pathOr, any, pathEq } from 'ramda'

const DEPARTMENTS = ['FRONTEND', 'BACKEND', 'ANDROID', 'IOS']

const typeDefs = gql`
  """
  Enumerator that indicates types of projects this application acknowledges
  """
  enum BidaDepartment {
    ${DEPARTMENTS.join('\n')}
  }

  extend type Repository {
    departments: [BidaDepartment]
  }

  extend type NPMPackage {
    dependents(
      after: String
      before: String
      first: Int
      last: Int
      archived: Boolean
      department: BidaDepartment
    ): SearchResultItemConnection
  }

  extend type Query {
    """
    Search projects within a department
    """
    projects(
      after: String
      before: String
      first: Int
      last: Int
      archived: Boolean
      department: BidaDepartment
    ): SearchResultItemConnection!

    """
    Lookup a project by department and id
    """
    project(id: String!): Repository!
  }
`

const Query = {
  /**
   * Resolves all projects of the provided department inside strvcom org.
   */
  projects: (root: any, args: any, context: any, info: any) => {
    const { department, archived, ...search } = args
    const { schema, mergeInfo } = info

    const type = 'REPOSITORY'
    const queryParts = ['user:strvcom']

    if (department) {
      queryParts.push(`topic:${department.toLowerCase()}`)
    }

    if (typeof archived !== 'undefined') {
      queryParts.push(`archived:${archived}`)
    }

    const query = queryParts.join(' ')

    return mergeInfo.delegateToSchema({
      info,
      schema,
      context,
      operation: 'query',
      fieldName: 'search',
      args: { type, query, ...search }
    })
  }
}

const Repository = {
  /**
   * Resolves the STRV departments of a repository based on present topics.
   */
  departments: {
    fragment: `
    ... on Repository {
      repositoryTopics (first: 10) {
        nodes {
          topic {
            name
          }
        }
      }
    }
  `,
    resolve: ({ repositoryTopics }: any) =>
      repositoryTopics.nodes
        .map(({ topic: { name } }: any) => name)
        .map((name: string) => name.toUpperCase())
        .filter((name: string) => DEPARTMENTS.includes(name))
  }
}

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

const NPMPackage = {
  /**
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
  dependents: {
    fragment: `... on NPMPackage { name }`,
    resolve: async ({ name }: any, args: any, context: any, info: any) => {
      // selection grafting
      info.fieldNodes[0].selectionSet.selections.push(dependentsSelection)

      const connection = await Query.projects(null, args, context, info)

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
}

const resolvers = { Query, Repository, NPMPackage }

export default { typeDefs, resolvers }
