import { GraphQLSchema } from 'graphql'
import { schema } from './'

describe('api/schema', () => {
  it('should export an executable schema', () => {
    expect(schema).toBeInstanceOf(GraphQLSchema)
  })
})
