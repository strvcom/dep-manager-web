import { printSchema, buildASTSchema, DocumentNode } from 'graphql'
import { transformSchema, Transform } from 'graphql-tools'
import gql from 'graphql-tag'

import { transform as transformConnections } from './connections'

// // ignore invariant erros, to allow invalid schemas.
// jest.mock('graphql/jsutils/invariant.js', () => () => {})

// /**
//  * Build and transform a schema, ignoring validations constraints.
//  */
// const build = (typeDefs: DocumentNode, transforms: Transform[] = []) =>
//   transformSchema(buildASTSchema(typeDefs, { assumeValid: true, assumeValidSDL: true }), transforms)

/**
 * Build and transform a schema, ignoring validations constraints.
 */
const build = (typeDefs: DocumentNode, transforms: Transform[] = []) =>
  transformSchema(buildASTSchema(typeDefs), transforms)

// type Entity {
//   field: String!
// }

// type EntityEdge {
//   cursor: String!
//   node: Entity
// }

// type EntityConnection {
//   edges: [EntityEdge]
//   nodes: [Entity]
//   # pageInfo: PageInfo!
//   totalCount: Int!
// }

describe('api/github/transforms', () => {
  describe('connections', () => {
    it('should make edges required', () => {
      const transformed = build(
        gql`
          type EntityEdge {
            field: String!
          }

          type EntityConnection {
            edges: [EntityEdge]
          }

          type SemiEntityConnection {
            edges: [EntityEdge]!
          }
        `,
        [transformConnections]
      )

      const expected = build(gql`
        type EntityEdge {
          field: String!
        }

        type EntityConnection {
          edges: [EntityEdge!]!
        }

        type SemiEntityConnection {
          edges: [EntityEdge!]!
        }
      `)

      expect(printSchema(transformed)).toBe(printSchema(expected))
    })
  })
})
