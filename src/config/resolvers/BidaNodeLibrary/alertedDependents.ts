import { createResolver } from '../../../utils/ResolverFunction'
import versionDiff from '../../../utils/version-diff'
import { AlertedDependentsRoot } from './__generated-types/AlertedDependentsRoot'

import gql from 'graphql-tag'
gql`
  fragment AlertedDependentsRoot on BidaNodeLibrary {
    version
    dependents {
      version
    }
  }
`

const alertedDependents = createResolver<AlertedDependentsRoot, null, number>(
  ({ root }) =>
    root.dependents.reduce(
      (acc, dependent) =>
        typeof root.version !== 'string' ||
        typeof dependent.version !== 'string' ||
        versionDiff(root.version, dependent.version) !== 'minor'
          ? acc
          : acc + 1,
      0
    )
)

export default alertedDependents
