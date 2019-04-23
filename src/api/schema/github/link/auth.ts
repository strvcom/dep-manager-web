import { ApolloLink } from 'apollo-link'

const link = new ApolloLink((operation: any, forward: any) => {
  const {
    graphqlContext: { headers }
  } = operation.getContext()

  if (headers && headers.authorization) {
    operation.setContext({ headers: { authorization: headers.authorization } })
  }

  return forward(operation)
})

export { link }
