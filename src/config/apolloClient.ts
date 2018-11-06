import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import {from} from 'apollo-link'
import { setContext } from 'apollo-link-context'
import {cache, stateLink} from './localState'


const httpLink = new HttpLink({uri: "https://api.github.com/graphql"})
const authLink = setContext((request, context) => {
  return context
})

export default new ApolloClient({
  cache,
  link: from([stateLink, authLink, httpLink])
})
