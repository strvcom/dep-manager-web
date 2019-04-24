import gql from 'graphql-tag'
import { __get__ } from './NPMPackage'

const dependsOn = __get__('dependsOn')
const edgeToDependent = __get__('edgeToDependent')
const isRepositoryField = __get__('isRepositoryField')

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
})

declare var deepDescribe: any
