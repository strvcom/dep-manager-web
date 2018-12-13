import React from 'react'
import Table, {
  Column,
  TableCellProps,
  TableCellDataGetterParams
} from '../../components/Table'
import StatusColumn from '../../components/Table/StatusColumn'
import { NodeLibrary } from '../../data/Library/__generated-types/NodeLibrary'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import Tag from '../../components/Tag'
import { isValidLicense } from '../../data/Library/index'

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
    const rowRenderer = React.useMemo(() => anchorRowRenderer(baseUrl, 'id'), [
      baseUrl
    ])
    return (
      <Table
        rowCount={libraries.length}
        rowGetter={({ index }) => libraries[index]}
        rowRenderer={rowRenderer}
      >
        <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />
        <Column
          width={80}
          label='Total Used On'
          dataKey='dependents'
          cellRenderer={handleTotalRender}
        />
        <Column
          width={180}
          label='Outdated Projects'
          dataKey='dependents'
          cellRenderer={renderOutdated}
        />
        <Column
          flexGrow={1}
          width={100}
          label='License'
          dataKey='license'
          cellRenderer={renderLicense}
        />
      </Table>
    )
  }
)

const renderLicense = ({
  rowData
}: TableCellDataGetterParams<'license', LibrariesQuery_libraries>) =>
  rowData.license && (
    <Tag critical={!isValidLicense(rowData.license)}>{rowData.license}</Tag>
  )

export default LibrariesTable
