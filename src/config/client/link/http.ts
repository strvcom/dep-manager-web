import { HttpLink } from 'apollo-link-http'
import { REACT_APP_GRAPHQL_ENDPOINT } from '../../../config/env'

const link = new HttpLink({
  uri: REACT_APP_GRAPHQL_ENDPOINT
})

export { link }
