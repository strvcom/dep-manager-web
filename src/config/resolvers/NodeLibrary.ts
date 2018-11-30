import { ResolverFunction } from '../../utils/ResolverFunction'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import versionDiff from '../../utils/version-diff'
const outdatedDependents: ResolverFunction = (
  nodeLibrary: NodeLibrary,
  variables,
  { cache }
) => {
  return nodeLibrary.dependents.reduce(
    (acc, dependent) =>
      versionDiff(nodeLibrary.version, dependent.version) === 'major'
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
      versionDiff(nodeLibrary.version, dependent.version) === 'minor'
        ? acc + 1
        : acc,
    0
  )
}

export default {
  outdatedDependents,
  alertedDependents
}
