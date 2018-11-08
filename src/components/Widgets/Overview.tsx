import React from 'react'
import { WidgetContainer, WidgetTitle } from './styled'
import {Status, BarChart, Count} from './styled'

const Overview = ({
  width,
  projectOverview: { total, active },
}: {
  width: string
  projectOverview: {
    total: number
    active: number
  }
}) => (
  <WidgetContainer width={width}>
    <WidgetTitle>Projects Overview</WidgetTitle>
    <BarChart fill={(active / total) * 100} />
    <Status>
      <div>
        Active <Count>{active}</Count>
        &nbsp;&nbsp;&nbsp;&nbsp; Archived&nbsp;
        <Count>{total - active}</Count>
      </div>
      <div>
        Total <Count>{total}</Count>
      </div>
    </Status>
  </WidgetContainer>
)

export default Overview
