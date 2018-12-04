import semver, { SemVer } from 'semver'

export default function versionDiff (version: string | SemVer, range: string) {
  const coercedRange = semver.coerce(range)
  return coercedRange && semver.diff(version, coercedRange)
}
