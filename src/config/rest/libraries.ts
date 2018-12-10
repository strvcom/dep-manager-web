import { Resolver } from 'graphql-anywhere'
import { Department } from '../../data/__generated-types'

interface Variables {
  department: Department
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
  if (!rootValue.organization || !rootValue.organization.repositories.nodes) { return null }
  // const nodes = rootValue.organization.repositories.nodes as Node[]
  return []
}

export default libraries
