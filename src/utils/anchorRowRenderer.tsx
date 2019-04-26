import React, { FunctionComponent } from 'react'
import { TableRowProps } from '../components/Table'
import { TableRow } from '../routes/Dashboard/styled'

const anchorRowRenderer = (
  baseUrL: string = '',
  attr: string | ((data: object) => string)
): FunctionComponent<TableRowProps> => ({
  className,
  columns,
  index,
  key,
  style,
  rowData,
}: TableRowProps) => {
  const to = typeof attr === 'string' ? rowData[attr] : attr(rowData)

  return (
    <TableRow
      aria-rowindex={index + 1}
      className={className}
      key={key}
      role="row"
      to={`${baseUrL}/${encodeURIComponent(to)}`}
      style={style}
    >
      {columns}
    </TableRow>
  )
}

export default anchorRowRenderer
