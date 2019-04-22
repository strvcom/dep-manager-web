import React, { Fragment } from 'react'
import Badge, { BadgeType } from '../Badge'

const { DANGER, WARNING } = BadgeType

const StatusColumn = ({ alerts = 0, outDated = 0 }: StatusColumnProps) =>
  alerts && outDated ? (
    <Fragment>
      {outDated ? <Badge type={DANGER}>{outDated} Outdated</Badge> : null}
      {alerts ? <Badge type={WARNING}>{alerts} Alerts</Badge> : null}
    </Fragment>
  ) : null

export interface StatusColumnProps {
  outDated: number
  alerts: number
}

export default React.memo(StatusColumn)
