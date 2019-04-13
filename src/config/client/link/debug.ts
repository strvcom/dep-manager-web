import { ApolloLink } from 'apollo-link'
import scope from 'debug'

const debug = scope('bida:api:github')

const link = new ApolloLink((operation, forward: any) => {
  const { operationName, variables } = operation

  debug('query: %s %o', operationName, variables)

  return forward(operation)
})

export { link }
