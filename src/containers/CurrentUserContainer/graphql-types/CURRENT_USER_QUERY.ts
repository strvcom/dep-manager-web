/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CURRENT_USER_QUERY
// ====================================================

export interface CURRENT_USER_QUERY_user {
  __typename: "User";
  id: string;
  /**
   * The user's public profile name.
   */
  name: string | null;
}

export interface CURRENT_USER_QUERY {
  /**
   * The currently authenticated user.
   */
  user: CURRENT_USER_QUERY_user;
}
