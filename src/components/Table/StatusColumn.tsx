import React, { FunctionComponent } from 'react'
import Badge, { BadgeType } from '../Badge'

const { DANGER, WARNING } = BadgeType

interface IStatusColumnProps {
  outDated: number
  alerts: number
}

const StatusColumn: FunctionComponent<IStatusColumnProps> = ({
  alerts = 0,
  outDated = 0,
}: IStatusColumnProps): JSX.Element | null =>
  alerts && outDated ? 
    <>
      {outDated ? <Badge type={DANGER}>{outDated} Outdated</Badge> : null}
      {alerts ? <Badge type={WARNING}>{alerts} Alerts</Badge> : null}
    </>
   : null

export default React.memo(StatusColumn)
