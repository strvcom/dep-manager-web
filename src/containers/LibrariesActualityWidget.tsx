import React from 'react'
import {
  StatusWrapper,
  StatusContainer,
  Percent
} from '../routes/Dashboard/widget-styled'
import Doughnut from '../components/Charts/Doughnut'
import { SpaceProps } from 'styled-system'
import { LibrariesQuery_libraries } from '../data/Library/__generated-types/LibrariesQuery'
import WidgetContainer, { WidgetTitle } from '../components/Charts/Container'

export interface LibraryActualityWidgetProps extends SpaceProps {
  width?: string
  libraries: Array<
    Pick<LibrariesQuery_libraries, 'totalDependents' | 'outdatedDependents'>
  >
}

const LibrariesActualityWidget = (props: LibraryActualityWidgetProps) => {
  const { libraries, mt, width } = props
  const { outDated, upToDate } = React.useMemo(
    () =>
      libraries.reduce(
        (acc, { totalDependents, outdatedDependents }) => ({
          outDated: acc.outDated + outdatedDependents,
          upToDate: acc.upToDate + (totalDependents - outdatedDependents)
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
        <Doughnut percent={outDatedPercent} />
        <StatusContainer>
          Up to Date
          <Percent>{upToDatePercent}%</Percent>
        </StatusContainer>
      </StatusWrapper>
    </WidgetContainer>
  )
}

export default React.memo(LibrariesActualityWidget)
