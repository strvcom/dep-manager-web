import { ApolloNonTerminalLink } from '../../../../utils/apollo-types'

const link = new ApolloNonTerminalLink((operation, forward) => {
  const {
    graphqlContext: { aws },
  } = operation.getContext()

  if (aws && aws.event.headers && aws.event.headers.authorization) {
    operation.setContext({ headers: { authorization: aws.event.headers.authorization } })
  }

  return forward(operation)
})

export { link }
