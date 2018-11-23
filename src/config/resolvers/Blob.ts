import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  NodePackageBlob,
  NodePackageBlob_package,
  NodePackageBlob_package_dependencies
} from '../../data/Repository/__generated-types/NodePackageBlob'
import PackageJSON from '../../utils/package-json'

const pack: ResolverFunction = (
  blob: NodePackageBlob
): NodePackageBlob_package | null => {
  if (!blob.text) return null
  const { name, version, dependencies }: PackageJSON = JSON.parse(blob.text)
  return {
    id: blob.id,
    name: name || null,
    version: version || null,
    dependencies: Object.entries(dependencies || {}).map<
    NodePackageBlob_package_dependencies
    >(([key, value]) => ({
      __typename: 'NodePackageDependency',
      version: value,
      name: key,
      id: `${key}:${value}`
    })),
    __typename: 'NodePackage'
  }
}

export default {
  package: pack
}
