import semver, { SemVer } from 'semver'

export default function versionDiff (
  left: string | SemVer,
  right: string | SemVer
) {
  const coercedLeft = semver.coerce(left)
  const coercedRight = semver.coerce(right)

  if (!coercedLeft || !coercedRight) return null

  return semver.diff(coercedLeft, coercedRight)
}
