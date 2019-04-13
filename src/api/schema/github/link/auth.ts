import { ApolloLink } from 'apollo-link'

const link = new ApolloLink((operation, forward) => {
  const {
    graphqlContext: { headers }
  } = operation.getContext()

  if (headers && headers.authorization) {
    operation.setContext({ headers: { authorization: headers.authorization } })
  }

  return forward!(operation)
})

export { link }
