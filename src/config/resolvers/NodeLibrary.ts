import { ResolverFunction } from '../../utils/ResolverFunction'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import semverDiff from 'semver-diff'
import semverRegex from 'semver-regex'

const outdatedDependents: ResolverFunction = (
  nodeLibrary: NodeLibrary,
  variables,
  { cache }
) => {
  return nodeLibrary.dependents.reduce(
    (acc, dependent) =>
      diffVersions(nodeLibrary.version, dependent.version) === 'major'
        ? acc + 1
        : acc,
    0
  )
}

const alertedDependents: ResolverFunction = (
  nodeLibrary: NodeLibrary,
  variables,
  { cache }
) => {
  return nodeLibrary.dependents.reduce(
    (acc, dependent) =>
      diffVersions(nodeLibrary.version, dependent.version) === 'minor'
        ? acc + 1
        : acc,
    0
  )
}

export default {
  outdatedDependents,
  alertedDependents
}

function diffVersions (v1: string, v2: string) {
  const [libraryVersion] = semverRegex().exec(v1) || [null]
  const [dependentVersion] = semverRegex().exec(v2) || [null]
  if (!libraryVersion || !dependentVersion) return null
  const diff = semverDiff(dependentVersion, libraryVersion)
  if (diff === 'major' || diff === 'minor') return diff
  return null
}
