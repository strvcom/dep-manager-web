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
export interface Viewer {
  login: string
  name: string
  avatarUrl: string
}

export interface ViewerResponse {
  viewer: Viewer
}
