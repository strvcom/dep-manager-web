import gql from "graphql-tag";

export const ME_QUERY = gql`
  query Me {
    viewer {
      login
      name
      avatarUrl
    }
  }
`;

export const REPOSITORIES_QUERY = gql`
  query Repositories($query: String!, $after: String) {
    search(type: REPOSITORY, query: $query, first: 50, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        ... on Repository {
          id
          name
          nameWithOwner
          url
          pushedAt
          object(expression: "HEAD:package.json") {
            ... on Blob {
              byteSize
              text
            }
          }
        }
      }
    }
    rateLimit {
      limit
      cost
      remaining
      resetAt
    }
  }
`;

export default {
  ME_QUERY,
  REPOSITORIES_QUERY
};
