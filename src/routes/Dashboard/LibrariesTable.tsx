import React from 'react'
import Table, { Column, TableCellProps } from '../../components/Table'
import StatusColumn from './StatusColumn'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'
import anchorRowRenderer from '../../utils/anchorRowRenderer'

export interface LibrariesTableProps {
  libraries: LibrariesQuery_libraries[]
  baseUrl?: string
}

const LibrariesTable = React.memo<LibrariesTableProps>(
  ({ baseUrl, libraries }) => {
    const handleTotalRender = React.useCallback(
      ({ rowData }: TableCellProps<'dependents', NodeLibrary>) =>
        rowData.dependents.length,
      [libraries]
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
      [libraries]
    )
    const rowRenderer = React.useMemo(() => anchorRowRenderer(baseUrl), [
      baseUrl
    ])
    return (
      <Table
        rowCount={libraries.length}
        rowGetter={({ index }) => libraries[index]}
        rowRenderer={rowRenderer}
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
  }
)

export default LibrariesTable
