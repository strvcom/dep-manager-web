import React from 'react'
import { TableCellProps } from 'react-virtualized'
import { Outdated, Alerts } from './styled'

const StatusCell = ({ cellData = { alerts: 0, outDated: 0 } }: StatusCellProps) => (
  <div>
    <Outdated count={cellData.outDated}>{cellData.outDated} Outdated</Outdated>{' '}
    <Alerts count={cellData.alerts}>{cellData.alerts} Alerts</Alerts>
  </div>
)

export interface StatusCellProps extends TableCellProps {
  cellData?: {
    outDated: number
    alerts: number
  }
}

export default React.memo(StatusCell)
