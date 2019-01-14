/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AuthQuery
// ====================================================

export interface AuthQuery_authentication {
  __typename: 'BidaAuthentication'
  /**
   * The Netlify token
   */
  token: string | null
}

export interface AuthQuery {
  /**
   * Lookup for a singleton that represents the authentication state of the client
   */
  authentication: AuthQuery_authentication
}
