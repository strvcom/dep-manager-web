import React from 'react'
import { TableRowProps } from '../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import { TableRow } from '../routes/Dashboard/styled'

const anchorRowRenderer = (baseUrL: string = '') => ({
  className,
  columns,
  index,
  key,
  style,
  rowData
}: TableRowProps<{ name: string; id: string }>) => {
  return (
    <TableRow
      aria-rowindex={index + 1}
      className={className}
      key={key}
      role='row'
      to={`${baseUrL}/${rowData.id}`}
      style={style}
    >
      {columns}
    </TableRow>
  )
}

export default anchorRowRenderer
