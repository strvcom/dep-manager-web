import { printSchema, buildASTSchema, DocumentNode } from 'graphql'
import { transformSchema, Transform } from 'graphql-tools'
import gql from 'graphql-tag'

import { transform as transformConnections } from './connections'

/**
 * Build and transform a schema, ignoring validations constraints.
 */
const build = (typeDefs: DocumentNode, transforms: Transform[] = []) =>
  transformSchema(buildASTSchema(typeDefs), transforms)

describe('api/github/transforms', () => {
  describe('connections', () => {
    it('should make connection::edges non-null', () => {
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

    it('should make connection::nodes non-null', () => {
      const transformed = build(
        gql`
          type Entity {
            field: String!
          }

          type EntityConnection {
            nodes: [Entity]
          }
        `,
        [transformConnections]
      )

      const expected = build(gql`
        type Entity {
          field: String!
        }

        type EntityConnection {
          nodes: [Entity!]!
        }
      `)

      expect(printSchema(transformed)).toBe(printSchema(expected))
    })

    it('should make edge::node non-null', () => {
      const transformed = build(
        gql`
          type Entity {
            field: String!
          }

          type EntityEdge {
            node: Entity
          }
        `,
        [transformConnections]
      )

      const expected = build(gql`
        type Entity {
          field: String!
        }

        type EntityEdge {
          node: Entity!
        }
      `)

      expect(printSchema(transformed)).toBe(printSchema(expected))
    })
  })
})
