import {
  NodePackageBlob,
  NodePackageBlob_package,
  NodePackageBlob_package_dependencies
} from '../../data/Repository/__generated-types/NodePackageBlob'
import PackageJSON from '../../utils/package-json'

type Dependencies = NodePackageBlob_package_dependencies

export default {
  package: (blob: NodePackageBlob): NodePackageBlob_package | null => {
    if (!blob.text) return null
    const packageJSON: PackageJSON = JSON.parse(blob.text)
    const dependencies = Object.entries(packageJSON.dependencies || {}).map<
    Dependencies
    >(([key, value]) => ({
      __typename: 'NodePackageDependency',
      version: value,
      name: key,
      id: `${key}:${value}`
    }))
    return {
      id: blob.id,
      name: packageJSON.name || null,
      version: packageJSON.version || null,
      dependencies,
      __typename: 'NodePackage'
    }
  }
}
