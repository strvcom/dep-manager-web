import { curry } from 'ramda'
import semver, { SemVer } from 'semver'

const versionDistance = curry(
  (
    left: string | SemVer | undefined,
    right: string | SemVer | undefined
  ): string => {
    if (!left || !right) return 'UNKNOWN'

    const coercedLeft = semver.coerce(left)
    const coercedRight = semver.coerce(right)

    if (!coercedLeft || !coercedRight) return 'UNKNOWN'

    const distance = semver.diff(coercedLeft, coercedRight)

    return distance ? distance.toUpperCase() : 'UPTODATE'
  }
)

const versionDiff = (left: string | SemVer, right: string | SemVer) => {
  const coercedLeft = semver.coerce(left)
  const coercedRight = semver.coerce(right)

  if (!coercedLeft || !coercedRight) return null

  return semver.diff(coercedLeft, coercedRight)
}

export default versionDiff

export { versionDistance, versionDiff }
