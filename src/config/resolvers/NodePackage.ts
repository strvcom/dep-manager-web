import { ResolverFunction } from '../../utils/ResolverFunction'
import {
  NodePackageBlob_package,
  NodePackageBlob_package_dependencies
} from '../../data/Repository/__generated-types/NodePackageBlob'
import versionDiff from '../../utils/version-diff'
import gql from 'graphql-tag'
import { LIBRARIES_QUERY } from '../../data/Library'
import { Department } from '../../data/__generated-types'
import { LibrariesQueryVariables } from '../../data/Library/__generated-types/LibrariesQuery'
import waitQueryResponse from '../../utils/wait-query-response'
import { NodeLibraryVersion } from './__generated-types/NodeLibraryVersion'

const NODE_LIBRARY_VERSION_FRAGMENT = gql`
  fragment NodeLibraryVersion on NodeLibrary {
    version
  }
`

const outdatedLibraries: ResolverFunction = (
  nodePackage: NodePackageBlob_package,
  variables,
  { cache }
) => {
  const reduceAmount = (
    acc: number,
    dependency: NodePackageBlob_package_dependencies
  ) => {
    const library = cache.readFragment<NodeLibraryVersion>({
      id: `NodeLibrary:${dependency.name}`,
      fragment: NODE_LIBRARY_VERSION_FRAGMENT
    })
    if (!library) return acc
    return versionDiff(library.version, dependency.version) === 'major'
      ? acc + 1
      : acc
  }
  waitQueryResponse<LibrariesQueryVariables>(LIBRARIES_QUERY, {
    department: Department.FRONTEND
  }).then(() => {
    const amount = nodePackage.dependencies.reduce(reduceAmount, 0)
    if (amount !== nodePackage.outdatedLibraries) {
      cache.writeData<Partial<NodePackageBlob_package>>({
        id: `${nodePackage.__typename}:${nodePackage.id}`,
        data: { outdatedLibraries: amount }
      })
    }
  })
  return nodePackage.dependencies.reduce(reduceAmount, 0)
}

const alertedLibraries: ResolverFunction = async (
  nodePackage: NodePackageBlob_package,
  variables,
  { cache }
) => {
  const reduceAmount = (
    acc: number,
    dependency: NodePackageBlob_package_dependencies
  ) => {
    const library = cache.readFragment<NodeLibraryVersion>({
      id: `NodeLibrary:${dependency.name}`,
      fragment: NODE_LIBRARY_VERSION_FRAGMENT
    })
    if (!library) return acc
    return versionDiff(library.version, dependency.version) === 'minor'
      ? acc + 1
      : acc
  }
  waitQueryResponse<LibrariesQueryVariables>(LIBRARIES_QUERY, {
    department: Department.FRONTEND
  }).then(() => {
    const amount = nodePackage.dependencies.reduce(reduceAmount, 0)
    if (amount !== nodePackage.outdatedLibraries) {
      cache.writeData<Partial<NodePackageBlob_package>>({
        id: `${nodePackage.__typename}:${nodePackage.id}`,
        data: { alertedLibraries: amount }
      })
    }
  })
  return nodePackage.dependencies.reduce(reduceAmount, 0)
}

export default {
  outdatedLibraries,
  alertedLibraries
}
