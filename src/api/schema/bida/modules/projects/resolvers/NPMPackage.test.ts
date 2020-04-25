/* eslint-disable no-shadow */
import gql from 'graphql-tag'
import { visit, print } from 'graphql/language'
import { chance } from '~app/tests/utils/mocking'

import {
  NPMPackage,
  Query,
  dependsOn,
  edgeToDependent,
  isRepositoryField,
  visitor,
} from './NPMPackage'

const projects = jest.fn()

// inject
Query.projects = projects

describe('api/bida/projects/resolvers/NPMPackage', () => {
  beforeEach(jest.clearAllMocks)

  const edge = {
    cursor: '123456',
    node: {
      npmPackage: {
        dependencies: [{ package: { name: 'first' } }, { package: { name: 'second' } }],
      },
    },
  } as any

  describe('[dependsOn]', () => {
    it('should check if an edge depends on a library', () => {
      expect(dependsOn('first')(edge)).toBe(true)
      expect(dependsOn('third')(edge)).toBe(false)
    })

    it('should be resilient not to break regardless of correct data', () => {
      expect(() => dependsOn('lib')(null)).not.toThrow()
      expect(dependsOn('lib')(null)).toBe(false)
    })
  })

  describe('[edgeToDependent]', () => {
    it('should normalize a valid edge', () => {
      expect(edgeToDependent('name', '1.0.0')(edge)).toEqual({
        cursor: '123456',
        node: {
          __typename: 'Dependent',
          __parent: { name: 'name', version: '1.0.0' },
          repository: edge.node,
        },
      })
    })
  })

  describe('[isRepositoryField]', () => {
    it('should correctly verify Dependent::repository fields', () => {
      const ast = gql`
        fragment Foo on Dependent {
          other
          repository {
            name
          }
        }
      `

      const other = ast.definitions[0].selectionSet.selections[0]
      const repository = ast.definitions[0].selectionSet.selections[1]

      expect(isRepositoryField(other)).toBe(false)
      expect(isRepositoryField(repository)).toBe(true)
    })
  })

  describe('[visitor]', () => {
    it('should not alter non-Dependent queries', () => {
      const doc = gql`
        {
          name
        }
      `

      expect(print(visit(doc, visitor))).toBe(print(doc))
    })

    it('should ignore Dependent fragment entirely when no repository requested', () => {
      const doc = gql`
        {
          other
          ... on Dependent {
            name
          }
        }
      `

      const expected = gql`
        {
          other
        }
      `

      expect(print(visit(doc, visitor))).toBe(print(expected))
    })

    it('should transform inline Dependent fragments into Repository fragments', () => {
      const doc = gql`
        {
          other
          ... on Dependent {
            repository {
              name
            }
          }
        }
      `

      const expected = gql`
        {
          other
          ... on Repository {
            name
          }
        }
      `

      expect(print(visit(doc, visitor))).toBe(print(expected))
    })

    it('should transform NPMPackage dependents selections to inject needed metadata', () => {
      const doc = gql`
        {
          package {
            dependents {
              name
            }
          }
        }
      `

      const expected = gql`
        {
          package {
            dependents {
              name
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
          }
        }
      `

      expect(print(visit(doc, visitor))).toBe(print(expected))
    })

    it('should append requested repository data when injecting metadata', () => {
      const doc = gql`
        {
          package {
            dependents {
              name
              edges {
                node {
                  ... on Dependent {
                    repository {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      `

      const expected = gql`
        {
          package {
            dependents {
              name
              edges {
                node {
                  ... on Repository {
                    id
                  }
                }
              }

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
          }
        }
      `

      expect(print(visit(doc, visitor))).toBe(print(expected))
    })
  })

  describe('::dependents', () => {
    const { resolve } = NPMPackage.dependents as any

    const build = () => ({
      root: { name: 'library', version: '1.0.0' },
      args: 'args',
      context: 'context',
      info: {},
    })

    const getEdge = (dependencies: string[]) => ({
      cursor: chance.string(),
      node: {
        name: 'repo',
        npmPackage: {
          dependencies: dependencies.map((name) => ({ package: { name } })),
        },
      },
    })

    it('should delegate to Query::projects', async () => {
      const { root, args, context, info } = build()

      projects.mockReturnValueOnce({ edges: [] })

      await resolve(root, args, context, info)

      expect(projects).toHaveBeenCalledTimes(1)
      expect(projects).toHaveBeenCalledWith({}, args, context, { ...info })
    })

    it('should return a connection shape', async () => {
      const { root, args, context, info } = build()

      projects.mockReturnValueOnce({ edges: [] })

      const result = await resolve(root, args, context, info)

      expect(result).toHaveProperty('edges', [])
      expect(result).toHaveProperty('repositoryCount', 0)
    })

    it('should return only dependents', async () => {
      const { root, args, context, info } = build()

      const dependent = getEdge(['library', 'second'])
      const nonDependent = getEdge(['first', 'second'])

      projects.mockReturnValueOnce({ edges: [nonDependent] })
      const empty = await resolve(root, args, context, info)
      expect(empty).toHaveProperty('edges', [])
      expect(empty).toHaveProperty('repositoryCount', 0)

      const { name } = dependent.node

      projects.mockReturnValueOnce({ edges: [nonDependent, dependent] })
      const found = await resolve(root, args, context, info)
      expect(found).toHaveProperty('edges.0.node.repository.name', name)
      expect(found).toHaveProperty('repositoryCount', 1)
    })
  })
})
