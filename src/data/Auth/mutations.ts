import MutationFunction from '../../utils/MutationFunction'
import gql from 'graphql-tag'
import { Auth } from './types'

export const CHANGE_TOKEN = gql`
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
