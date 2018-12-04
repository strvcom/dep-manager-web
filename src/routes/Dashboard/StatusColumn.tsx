import React from 'react'
import { Outdated, Alerts } from './styled'

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

export default React.memo(StatusColumn)
