import { Resolver } from 'graphql-anywhere'
import { BidaDepartment } from '../../data/__generated-types'

interface Variables {
  department: BidaDepartment
}
// type Node = LoadDataQuery_organization_repositories_nodes

const libraries: Resolver = (
  fieldName,
  rootValue,
  { department }: Variables,
  context,
  info
) => {
  console.log(rootValue)
  if (!rootValue.organization || !rootValue.organization.repositories.nodes) {
    return null
  }
  // const nodes = rootValue.organization.repositories.nodes as Node[]
  return []
}

export default libraries
