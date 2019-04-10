import { ApolloLink } from 'apollo-link'
import scope from 'debug'

const debug = scope('bida:api:github')

const link = new ApolloLink((operation, forward: any) => {
  const { operationName, variables } = operation

  debug('delegating to GitHub: %s %o', operationName, variables)

  return forward(operation)
})

export { link }
