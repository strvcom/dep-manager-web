import client from '../config/apolloClient'
import { REPOSITORIES_QUERY } from './Repository'
import reformatData from './helpers'

export const getRepositories = (query: string) =>
  client.query({query: REPOSITORIES_QUERY, variables: {query}})
  .then(({ data }) => reformatData(data))
