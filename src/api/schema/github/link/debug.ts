import scope from 'debug'
import { ApolloNonTerminalLink } from '../../../../utils/apollo-types'

const debug = scope('bida:api:github')

const link = new ApolloNonTerminalLink((operation, forward) => {
  const { operationName, variables } = operation

  debug('delegating to GitHub: %s %o', operationName, variables)

  return forward(operation)
})

export { link }
