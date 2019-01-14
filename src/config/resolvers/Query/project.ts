import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import {
  ProjectResolverVariables,
  ProjectResolver_project
} from './__generated-types/ProjectResolver'
import { BidaDepartment } from '../../../data/__generated-types'
import { QueryProject } from './__generated-types/QueryProject'

gql`
  query ProjectResolver($department: BidaDepartment!, $id: String!) {
    project(id: $id, department: $department) {
      id
    }
  }
`

export default createResolver<{}, ProjectResolverVariables>(
  ({ variables: { department, id }, cache, getCacheKey }) => {
    switch (department) {
      case BidaDepartment.FRONTEND:
      case BidaDepartment.BACKEND:
        return cache.readFragment<QueryProject>({
          fragment: gql`
            fragment QueryProject on BidaNodeProject {
              id
              name
              url
              dependencies {
                id
                name
                version
              }
            }
          `,
          id: getCacheKey({ __typename: toTypename(department), id })
        })
      case BidaDepartment.ANDROID:
      case BidaDepartment.IOS:
      default:
        return null
    }
  }
)

function toTypename (
  department: BidaDepartment
): ProjectResolver_project['__typename'] {
  switch (department) {
    case BidaDepartment.FRONTEND:
    case BidaDepartment.BACKEND:
      return 'BidaNodeProject'
    case BidaDepartment.ANDROID:
      return 'BidaAndroidProject'
    case BidaDepartment.IOS:
      return 'BidaIOSProject'
  }
}
