import scope from 'debug'
import { ApolloLink } from 'apollo-link'

const debug = scope('bida:api:github')

const link = new ApolloLink((operation, forward) => {
  const { operationName, variables } = operation

  debug('delegating to GitHub: %s %o', operationName, variables)

  return forward(operation)
})

export { link }
