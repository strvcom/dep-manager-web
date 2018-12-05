import { ResolverFunction } from '../../utils/ResolverFunction'
import { NodePackageBlob_package_dependencies } from '../../data/Repository/__generated-types/NodePackageBlob'
import { NODE_LIBRARY_FRAGMENT } from '../../data/Library'

const library: ResolverFunction = (
  dependency: NodePackageBlob_package_dependencies,
  variables,
  { cache }
) =>
  cache.readFragment({
    fragment: NODE_LIBRARY_FRAGMENT,
    id: `NodeLibrary:${dependency.name}`
  })
export default {
  library
}
