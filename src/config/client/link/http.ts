import { HttpLink } from 'apollo-link-http'

const link = new HttpLink({
  uri: 'http://localhost:9000/graphql'
})

export { link }
