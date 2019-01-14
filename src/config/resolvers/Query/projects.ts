import { createResolver } from '../../../utils/apollo-utils'
import gql from 'graphql-tag'
import { QueryProjectsVariables } from './__generated-types/QueryProjects'

gql`
  query QueryProjects($department: BidaDepartment!) {
    projects(department: $department) {
      id
    }
  }
`

export default createResolver<{}, QueryProjectsVariables, string>(
  ({ variables, getCacheKey }) => null
)
