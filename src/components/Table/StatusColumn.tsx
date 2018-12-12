import React from 'react'
import { Outdated, Alerts } from './styled'

const StatusColumn = ({ alerts = 0, outDated = 0 }: StatusColumnProps) => (
  <div>
    {outDated > 0 && <Outdated count={outDated}>{outDated} Outdated</Outdated>}{' '}
    {alerts > 0 && <Alerts count={alerts}>{alerts} Alerts</Alerts>}
  </div>
)

export interface StatusColumnProps {
  outDated: number
  alerts: number
}

export default React.memo(StatusColumn)
