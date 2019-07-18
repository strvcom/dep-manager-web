import React, { FunctionComponent } from 'react'
import { TableRowProps } from '../components/Table'
import { TableRow } from '../routes/Dashboard/styled'

const anchorRowRenderer = <Attr extends string>(
  baseUrL: string = '',
  attr: Attr | ((data: { [prop in Attr]: string }) => string)
): FunctionComponent<TableRowProps<{ [prop in Attr]: string }>> => ({
  className,
  columns,
  index,
  key,
  style,
  rowData,
}: TableRowProps<{ [prop in Attr]: string }>) => {
  const to = attr instanceof Function ? attr(rowData) : rowData[attr]
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
