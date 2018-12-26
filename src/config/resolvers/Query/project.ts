import { createResolver } from '../../../utils/ResolverFunction'
import gql from 'graphql-tag'
import {
  ProjectResolverVariables,
  ProjectResolver_project
} from './__generated-types/ProjectResolver'
import { BidaDepartment } from '../../../data/__generated-types'

gql`
  query ProjectResolver($department: BidaDepartment!, $id: String!) {
    project(id: $id, department: $department) {
      id
    }
  }
`

export default createResolver<{}, ProjectResolverVariables>(
  async ({ variables: { department, id }, getCacheKey }) =>
    getCacheKey({ __typename: toTypename(department), id })
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
