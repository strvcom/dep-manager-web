/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeTokenMutation
// ====================================================

export interface ChangeTokenMutation_changeToken {
  __typename: 'BidaAuthentication'
  /**
   * The Netlify token
   */
  token: string | null
}

export interface ChangeTokenMutation {
  /**
   * Changes the authentication token
   */
  changeToken: ChangeTokenMutation_changeToken
}

export interface ChangeTokenMutationVariables {
  token: string
}
