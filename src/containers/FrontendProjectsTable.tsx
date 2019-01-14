import React from 'react'
import Table, { Column, Index, TableCellProps } from '../components/Table/index'
import StatusColumn from '../components/Table/StatusColumn'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import * as routes from '../routes/routes'
import gql from 'graphql-tag'
import { NodeProjectsTableItem } from './__generated-types/NodeProjectsTableItem'

gql`
  fragment NodeProjectsTableItem on BidaNodeProject {
    id
    name
    pushedAt
    alertedLibraries
    outdatedLibraries
  }
`
export interface NodeProjectsTableProps {
  projects: NodeProjectsTableItem[]
}

const NodeProjectsTable = React.memo<NodeProjectsTableProps>(({ projects }) => {
  const rowGetter = React.useCallback(({ index }: Index) => projects[index], [
    projects
  ])
  const rowRenderer = React.useMemo(
    () => anchorRowRenderer(routes.frontendProjects, 'id'),
    [routes.frontendProjects]
  )
  return (
    <Table
      rowCount={projects.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} label='Project Name' dataKey='name' />
      <Column
        width={180}
        label='Last Active'
        dataKey='pushedAt'
        cellRenderer={renderDate}
      />
      <Column
        width={200}
        label='Outdated Libraries'
        dataKey='id'
        cellRenderer={renderOutdated}
      />
    </Table>
  )
})

const renderOutdated = ({
  rowData
}: TableCellProps<'id', NodeProjectsTableItem>) => {
  const { outdatedLibraries, alertedLibraries } = rowData
  return (
    <StatusColumn
      outDated={outdatedLibraries || 0}
      alerts={alertedLibraries || 0}
    />
  )
}

const renderDate = ({ cellData }: { cellData?: string }) =>
  cellData ? dateFormatter.format(Date.parse(cellData)) : null

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export default NodeProjectsTable
