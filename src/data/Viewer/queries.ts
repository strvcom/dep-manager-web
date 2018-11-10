import gql from 'graphql-tag'

export const VIEWER_QUERY = gql`
  query Me {
    viewer {
      login
      name
      avatarUrl
    }
  }
`
