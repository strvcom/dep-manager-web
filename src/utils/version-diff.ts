import { curry } from 'ramda'
import semver, { SemVer } from 'semver'

const versionDistance = curry(
  (left?: string | SemVer, right?: string | SemVer): string => {
    if (!left || !right) return 'UNKNOWN'

    const coercedLeft = semver.coerce(left)
    const coercedRight = semver.coerce(right)

    if (!coercedLeft || !coercedRight) return 'UNKNOWN'

    const distance = semver.diff(coercedLeft, coercedRight)

    return distance ? distance.toUpperCase() : 'UPTODATE'
  }
)

export { versionDistance }
