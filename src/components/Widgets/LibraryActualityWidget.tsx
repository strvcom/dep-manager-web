import React from 'react'
import {
  WidgetContainer,
  WidgetTitle,
  StatusWrapper,
  StatusContainer,
  Percent
} from './styled'
import DoughnutChart from './DoughnutChart'
import { useLibraries } from '../../data/Library'
import { SpaceProps } from 'styled-system'
import semverRegex from 'semver-regex'
import semverDiff from 'semver-diff'
import { Department } from '../../data/__generated-types'

const LibraryActualityWidget = ({
  width,
  mt,
  department
}: LibraryActualityWidgetProps) => {
  const { data: libraries } = useLibraries(department)
  if (!libraries) return null
  const { outDated, upToDate } = libraries.reduce(
    (acc, { dependents, version }) => {
      const libraryVersion = semverRegex().exec(version)![0]
      const outDatedDependents = dependents.reduce((acc1, dependent) => {
        const dependentVersion = semverRegex().exec(dependent.version)![0]
        const diff = semverDiff(dependentVersion, libraryVersion)
        return diff === 'major' ? acc1 + 1 : acc1
      }, 0)
      return {
        outDated: acc.outDated + outDatedDependents,
        upToDate: acc.upToDate + (dependents.length - outDatedDependents)
      }
    },
    { outDated: 0, upToDate: 0 }
  )
  const totalUsed = outDated + upToDate
  const outDatedPercent = Math.round((outDated / totalUsed) * 100 * 10) / 10
  const upToDatePercent = Math.round((upToDate / totalUsed) * 100 * 10) / 10
  return (
    <WidgetContainer mt={mt} width={width}>
      <WidgetTitle>Libraries Status</WidgetTitle>
      <StatusWrapper>
        <StatusContainer>
          Outdated
          <Percent>{outDatedPercent}%</Percent>
        </StatusContainer>
        <DoughnutChart percent={outDatedPercent} />
        <StatusContainer>
          Up to Date
          <Percent>{upToDatePercent}%</Percent>
        </StatusContainer>
      </StatusWrapper>
    </WidgetContainer>
  )
}

export interface LibraryActualityWidgetProps extends SpaceProps {
  width?: string
  department: Department
}

export default React.memo(LibraryActualityWidget)
