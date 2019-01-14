import { createResolver } from '../../../utils/apollo-utils'
import {
  ChangeTokenMutationVariables,
  ChangeTokenMutation_changeToken
} from './__generated-types/ChangeTokenMutation'
import gql from 'graphql-tag'

gql`
  mutation ChangeTokenMutation($token: String!) {
    changeToken(token: $token) {
      token
    }
  }
`

const id: ChangeTokenMutation_changeToken['__typename'] = 'BidaAuthentication'

const changeToken = createResolver<
ChangeTokenMutation_changeToken,
ChangeTokenMutationVariables
>(({ cache, variables: { token } }) => {
  const data: ChangeTokenMutation_changeToken = {
    __typename: 'BidaAuthentication',
    token
  }
  cache.writeData({ data, id })
  return data
})

export default changeToken
