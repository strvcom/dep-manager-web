import React from 'react'
import {
  WidgetContainer,
  WidgetTitle,
  StatusWrapper,
  StatusContainer,
  Percent
} from './styled'
import DoughnutChart from './DoughnutChart'
import { SpaceProps } from 'styled-system'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'

export interface LibraryActualityWidgetProps extends SpaceProps {
  width?: string
  libraries: LibrariesQuery_libraries[]
}

const LibrariesActualityWidget = ({
  width,
  mt,
  libraries
}: LibraryActualityWidgetProps) => {
  const { outDated, upToDate } = React.useMemo(
    () =>
      libraries.reduce(
        (acc, { dependents, outdatedDependents }) => ({
          outDated: acc.outDated + outdatedDependents,
          upToDate: acc.upToDate + (dependents.length - outdatedDependents)
        }),
        { outDated: 0, upToDate: 0 }
      ),
    [libraries]
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

export default React.memo(LibrariesActualityWidget)
