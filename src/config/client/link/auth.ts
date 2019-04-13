import { ApolloLink } from 'apollo-link'

const link = new ApolloLink((operation, forward) => {
  const { token } = operation.getContext()

  if (token) {
    operation.setContext({ headers: { authorization: `bearer ${token}` } })
  }

  return forward!(operation)
})

export { link }
