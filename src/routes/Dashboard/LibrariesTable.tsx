import React from 'react'
import Table, { Column, TableCellProps } from '../../components/Table'
import StatusColumn from './StatusColumn'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'

export interface LibrariesTableProps {
  libraries: LibrariesQuery_libraries[]
  onRowClick?: (project: Repositories_nodes) => void
}

const LibrariesTable = React.memo<LibrariesTableProps>(props => {
  const handleTotalRender = React.useCallback(
    ({ rowData }: TableCellProps<'dependents', NodeLibrary>) =>
      rowData.dependents.length,
    [props.libraries]
  )
  const renderOutdated = React.useCallback(
    ({ rowData }: TableCellProps<'dependents', NodeLibrary>) => {
      return (
        <StatusColumn
          outDated={rowData.outdatedDependents}
          alerts={rowData.alertedDependents}
        />
      )
    },
    [props.libraries]
  )
  return (
    <Table
      rowCount={props.libraries.length}
      rowGetter={({ index }) => props.libraries[index]}
    >
      <Column width={380} label='Library Name' dataKey='name' />
      <Column
        width={380}
        label='Total Used On'
        dataKey='dependents'
        cellRenderer={handleTotalRender}
      />
      <Column
        width={380}
        label='Outdated Projects'
        dataKey='dependents'
        cellRenderer={renderOutdated}
      />
    </Table>
  )
})

export default LibrariesTable
