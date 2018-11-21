/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeToken
// ====================================================

export interface ChangeToken_changeToken {
  __typename: 'Authentication'
  token: string | null
}

export interface ChangeToken {
  changeToken: ChangeToken_changeToken
}

export interface ChangeTokenVariables {
  token: string
}
