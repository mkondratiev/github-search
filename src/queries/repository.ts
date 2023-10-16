import { gql } from "../__generated__/gql";

const SEARCH_FOR_REPO = gql(`
  query SearchForRepo($query: String!) {
    search(type: REPOSITORY, query: $query, first: 20) {
      nodes {
        ... on Repository {
          id
          name
          nameWithOwner
          description
          url
          homepageUrl
          owner {
            avatarUrl
          }
        }
      }
    }
  }
`);

export { SEARCH_FOR_REPO };
