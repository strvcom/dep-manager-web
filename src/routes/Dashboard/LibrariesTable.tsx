import React from 'react'
import { useLibraries } from '../../data/Library'
import Table, { Column } from '../../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import { Department } from '../../config/types'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'

export interface LibrariesTableProps {
  department: Department
  onRowClick?: (project: Repositories_nodes) => void
}

export const LibrariesTable = React.memo<LibrariesTableProps>(props => {
  const { errors, data: libraries } = useLibraries(props.department)
  if (errors) return null
  if (!libraries) return null
  // const handleRowClick = React.useCallback(
  //   ({ index }: Index) => props.onRowClick!(projects[index]),
  //   [projects]
  // )
  // const rowGetter = React.useCallback(
  //   ({ index }: Index) => projects[index],
  //   [projects]
  // )
  return (
    <Table
      rowCount={libraries.length}
      rowGetter={({ index }) => libraries[index]}
      // onRowClick={props.onRowClick && handleRowClick}
    >
      <Column width={380} label='Library Name' dataKey='name' />
    </Table>
  )
})

// const renderDate = ({cellData}: {cellData?: string}) => cellData
// ? dateFormatter.format(Date.parse(cellData))
// : null

// const dateFormatter = new Intl.DateTimeFormat('en-US', {
//   month: 'short',
//   day: 'numeric',
//   year: 'numeric'
// })
