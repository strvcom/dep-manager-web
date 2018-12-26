import { createResolver } from '../../../utils/ResolverFunction'
import versionDiff from '../../../utils/version-diff'
import { OutdatedDependentsRoot } from './__generated-types/OutdatedDependentsRoot'

import gql from 'graphql-tag'
gql`
  fragment OutdatedDependentsRoot on BidaNodeLibrary {
    version
    dependents {
      version
    }
  }
`

const outdatedDependents = createResolver<OutdatedDependentsRoot, null, number>(
  ({ root }) =>
    root.dependents.reduce(
      (acc, dependent) =>
        typeof root.version !== 'string' ||
        typeof dependent.version !== 'string' ||
        versionDiff(root.version, dependent.version) !== 'major'
          ? acc
          : acc + 1,
      0
    )
)

export default outdatedDependents
