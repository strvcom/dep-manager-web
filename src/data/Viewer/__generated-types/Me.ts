/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_viewer {
  __typename: 'User'
  /**
   * The username used to login.
   */
  login: string
  /**
   * The user's public profile name.
   */
  name: string | null
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any
}

export interface Me {
  /**
   * The currently authenticated user.
   */
  viewer: Me_viewer
}
