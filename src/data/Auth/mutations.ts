import MutationFunction from '../../utils/MutationFunction'
import gqlLocal from 'graphql-tag'
import { Auth } from './types'

export const CHANGE_TOKEN = gqlLocal`
  mutation ChangeToken($token: String!) {
    changeToken(token: $token) @client
  }
`

export interface ChangeTokenVariables {
  token: string
}

export const changeToken: MutationFunction<ChangeTokenVariables> = (
  _,
  variables,
  { cache }
) => {
  cache.writeData<{ auth: Auth }>({
    data: {
      auth: { __typename: 'Auth', token: variables.token }
    }
  })
  return null
}
