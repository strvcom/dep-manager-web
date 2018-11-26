import React from 'react'
import { Outdated, Alerts } from './styled'
import semverDiff from 'semver-diff'
import semverRegex from 'semver-regex'

const StatusColumn = ({ alerts = 0, outDated = 0 }: StatusColumnProps) => (
  <div>
    <Outdated count={outDated}>{outDated} Outdated</Outdated>{' '}
    <Alerts count={alerts}>{alerts} Alerts</Alerts>
  </div>
)

export interface StatusColumnProps {
  outDated: number
  alerts: number
}

export function diffVersions (v1: string, v2: string) {
  const [libraryVersion] = semverRegex().exec(v1) || [null]
  const [dependentVersion] = semverRegex().exec(v2) || [null]
  if (!libraryVersion || !dependentVersion) return null
  const diff = semverDiff(dependentVersion, libraryVersion)
  if (diff === 'major' || diff === 'minor') return diff
  return null
}

export function reduceStatusColumnProps (
  props: StatusColumnProps,
  v1: string,
  v2: string
) {
  const diff = diffVersions(v1, v2)
  switch (diff) {
    case 'major':
      return { ...props, outDated: props.outDated + 1 }
    case 'minor':
      return { ...props, alerts: props.alerts + 1 }
    default:
      return props
  }
}

export default React.memo(StatusColumn)
