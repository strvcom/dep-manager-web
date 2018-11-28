import { LIBRARIES_QUERY, NODE_LIBRARY_FRAGMENT } from '../../data/Library'
import { Department } from '../../data/__generated-types'
import { ResolverFunction } from '../../utils/ResolverFunction'
import { NodePackageBlob_package } from '../../data/Repository/__generated-types/NodePackageBlob'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import semverDiff from 'semver-diff'
import semverRegex from 'semver-regex'
import {
  LibrariesQuery,
  LibrariesQueryVariables
} from '../../data/Library/__generated-types/LibrariesQuery'

const outdatedLibraries: ResolverFunction = async (
  nodePackage: NodePackageBlob_package,
  variables,
  { cache }
) => {
  await getNodeLibraries()
  const amount = nodePackage.dependencies.reduce((acc, dependency) => {
    const library = cache.readFragment<NodeLibrary>({
      id: `NodeLibrary:${dependency.name}`,
      fragment: NODE_LIBRARY_FRAGMENT
    })
    if (!library) return acc
    return diffVersions(library.version, dependency.version) === 'major'
      ? acc + 1
      : acc
  }, 0)
  return amount
}

const alertedLibraries: ResolverFunction = async (
  nodePackage: NodePackageBlob_package,
  variables,
  { cache }
) => {
  await getNodeLibraries()
  const amount = nodePackage.dependencies.reduce((acc, dependency) => {
    const library = cache.readFragment<NodeLibrary>({
      id: `NodeLibrary:${dependency.name}`,
      fragment: NODE_LIBRARY_FRAGMENT
    })
    if (!library) return acc
    return diffVersions(library.version, dependency.version) === 'minor'
      ? acc + 1
      : acc
  }, 0)
  return amount
}

export default {
  outdatedLibraries,
  alertedLibraries
}

async function getNodeLibraries () {
  const { default: client } = await import('../apolloClient')
  const {
    data: { libraries }
  } = await client.query<LibrariesQuery, LibrariesQueryVariables>({
    query: LIBRARIES_QUERY,
    variables: { department: Department.FRONTEND },
    fetchResults: false
  })
  return libraries
}

function diffVersions (v1: string, v2: string) {
  const [libraryVersion] = semverRegex().exec(v1) || [null]
  const [dependentVersion] = semverRegex().exec(v2) || [null]
  if (!libraryVersion || !dependentVersion) return null
  const diff = semverDiff(dependentVersion, libraryVersion)
  if (diff === 'major' || diff === 'minor') return diff
  return null
}
