import { ApolloNonTerminalLink } from '../../../utils/apollo-types'

const link = new ApolloNonTerminalLink((operation, forward) => {
  const { token } = operation.getContext()

  if (token) {
    operation.setContext({ headers: { authorization: `bearer ${token}` } })
  }

  return forward(operation)
})

export { link }
