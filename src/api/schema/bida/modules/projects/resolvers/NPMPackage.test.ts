import gql from 'graphql-tag'
import { visit, print } from 'graphql/language'

import { __get__ } from './NPMPackage'

const dependsOn = __get__('dependsOn')
const edgeToDependent = __get__('edgeToDependent')
const isRepositoryField = __get__('isRepositoryField')
const visitor = __get__('visitor')

deepDescribe('api/bida/projects/resolvers/NPMPackage', () => {
  beforeEach(jest.clearAllMocks)

  const edge = {
    cursor: '123456',
    node: {
      npmPackage: {
        dependencies: [
          { package: { name: 'first' } },
          { package: { name: 'second' } }
        ]
      }
    }
  }

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
          repository: edge.node
        }
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

    it('should transform Dependent fragments into Repository fragments', () => {
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
  })
})

declare var deepDescribe: any
