/* eslint-disable no-shadow */
import { HttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-fetch'

const link = new HttpLink({
  uri: 'https://api.github.com/graphql',
  fetch,
})

export { link }
