import { ApolloNonTerminalLink } from '../../../../utils/apollo-types'

const link = new ApolloNonTerminalLink((operation, forward) => {
  const {
    graphqlContext: { headers },
  } = operation.getContext()

  if (headers && headers.authorization) {
    operation.setContext({ headers: { authorization: headers.authorization } })
  }

  return forward(operation)
})

export { link }
