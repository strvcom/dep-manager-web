import React from 'react'
import Table, { Column, Index, TableCellProps } from '../../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import StatusColumn from '../../components/Table/StatusColumn'
import { Repository } from '../../data/Repository/__generated-types/Repository'
import { RepositoriesQuery_organization_repositories_nodes } from '../../data/Repository/__generated-types/RepositoriesQuery'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import { isBlob } from '../../data/Repository'

export interface ProjectsTableProps {
  projects: RepositoriesQuery_organization_repositories_nodes[]
  baseUrl?: string
}

const ProjectsTable = React.memo<ProjectsTableProps>(
  ({ projects, baseUrl }) => {
    const rowGetter = React.useCallback(({ index }: Index) => projects[index], [
      projects
    ])
    const rowRenderer = React.useMemo(() => anchorRowRenderer(baseUrl, 'id'), [
      baseUrl
    ])
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
          dataKey='object'
          cellRenderer={renderOutdated}
        />
        {/* <Column width={360} label='Github Username' dataKey='collaborators' /> */}
      </Table>
    )
  }
)

const renderOutdated = ({
  cellData,
  rowData
}: TableCellProps<'object', Repository>) => {
  if (!cellData || !isBlob(cellData) || !cellData.package) return null
  const {
    package: { outdatedLibraries, alertedLibraries }
  } = cellData
  return <StatusColumn outDated={outdatedLibraries} alerts={alertedLibraries} />
}

const renderDate = ({ cellData }: { cellData?: string }) =>
  cellData ? dateFormatter.format(Date.parse(cellData)) : null

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export default ProjectsTable
