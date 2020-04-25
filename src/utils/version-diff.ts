import { curry } from 'ramda'
import semver, { SemVer } from 'semver'
import { SemverOutdateStatus } from '~generated/types'
import { is } from '~app/utils/type-utils'

const isSemVerStatus = is(SemverOutdateStatus)

const versionDistance = curry((left: string | SemVer, right: string | SemVer) => {
  if (!left || !right) return SemverOutdateStatus.Unknown

  const coercedLeft = semver.coerce(left)
  const coercedRight = semver.coerce(right)

  if (!coercedLeft || !coercedRight) return SemverOutdateStatus.Unknown

  const distance = semver.diff(coercedLeft, coercedRight)?.toUpperCase()
  if (distance) return isSemVerStatus(distance) ? distance : SemverOutdateStatus.Unknown

  return SemverOutdateStatus.Uptodate
})

export { versionDistance }
