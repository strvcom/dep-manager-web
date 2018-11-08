import MutationFunction from '../../utils/MutationFunction'
import gql from 'graphql-tag'
import {Auth} from './types'
import * as React from 'react'
import { Mutation, MutationProps } from 'react-apollo'
import {Omit} from 'utility-types'

export const CHANGE_TOKEN = gql`
  mutation ChangeToken($token: String!) {
    changeToken(token: $token) @client
  }
`

interface ChangeTokenVariables {
  token: string
}


export const changeToken: MutationFunction<ChangeTokenVariables> = (_, variables, {cache}) => {
  cache.writeData<{auth: Auth}>({data: {
    auth: {__typename: 'Auth', token: variables.token}
  }})
  return null
}


export const MutateAuth = (props: Omit<MutationProps<{auth: Auth}, ChangeTokenVariables>, 'mutation'>) => (
  <Mutation<{auth: Auth}, ChangeTokenVariables> {...props} mutation={CHANGE_TOKEN}/>
)
