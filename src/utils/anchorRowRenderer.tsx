import React from 'react'
import { TableRowProps } from '../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import { TableRow } from '../routes/Dashboard/styled'

const anchorRowRenderer = (
  baseUrL: string = '',
  attr: string | ((data: any) => string)
) => ({
  className,
  columns,
  index,
  key,
  style,
  rowData
}: TableRowProps<Record<any, string>>) => {
  const to = typeof attr === 'string' ? rowData[attr] : attr(rowData)
  return (
    <TableRow
      aria-rowindex={index + 1}
      className={className}
      key={key}
      role='row'
      to={`${baseUrL}/${to}`}
      style={style}
    >
      {columns}
    </TableRow>
  )
}

export default anchorRowRenderer
