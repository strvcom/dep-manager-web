import React from 'react'
import Table, {
  Column,
  Index,
  TableCellProps,
  TableCellDataGetterParams
} from '../components/Table/index'
import StatusColumn from '../components/Table/StatusColumn'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import Tag from '../components/Tag'
import * as routes from '../routes/routes'
import { isValidLicense } from '../data/Library/index'
import gql from 'graphql-tag'
import { NodeLibrariesTableItem } from './__generated-types/NodeLibrariesTableItem'

gql`
  fragment NodeLibrariesTableItem on BidaNodeLibrary {
    id
    totalDependents
    alertedDependents
    outdatedDependents
    license
  }
`

export interface NodeLibrariesTableProps {
  libraries: NodeLibrariesTableItem[]
}

const NodeLibrariesTable = React.memo<NodeLibrariesTableProps>(
  ({ libraries }) => {
    const renderOutdated = React.useCallback(
      ({
        rowData: { outdatedDependents, alertedDependents }
      }: TableCellProps<'id', NodeLibrariesTableItem>) => {
        return (
          <StatusColumn
            outDated={outdatedDependents || 0}
            alerts={alertedDependents || 0}
          />
        )
      },
      [libraries]
    )
    const rowRenderer = React.useMemo(
      () => anchorRowRenderer(routes.frontendLibraries, 'id'),
      [routes.frontendLibraries]
    )
    const rowGetter = React.useCallback(
      ({ index }: Index) => libraries[index],
      [libraries]
    )
    return (
      <Table
        rowCount={libraries.length}
        rowGetter={rowGetter}
        rowRenderer={rowRenderer}
      >
        <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />
        <Column width={80} label='Total Used On' dataKey='totalDependents' />
        <Column
          width={180}
          label='Outdated Projects'
          dataKey='id'
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
}: TableCellDataGetterParams<'license', NodeLibrariesTableItem>) =>
  rowData.license && (
    <Tag critical={!isValidLicense(rowData.license)}>{rowData.license}</Tag>
  )

export default NodeLibrariesTable
