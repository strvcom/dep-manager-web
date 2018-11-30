import semverRegex from 'semver-regex'
import semverDiff from 'semver-diff'

export default function versionDiff (v1: string, v2: string) {
  const [libraryVersion] = semverRegex().exec(v1) || [null]
  const [dependentVersion] = semverRegex().exec(v2) || [null]
  if (!libraryVersion || !dependentVersion) return null
  const diff = semverDiff(dependentVersion, libraryVersion)
  if (diff === 'major' || diff === 'minor') return diff
  return null
}
