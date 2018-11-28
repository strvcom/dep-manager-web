import React from 'react'
import Table, { Column, Index, TableCellProps } from '../../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import { Repositories_nodes } from '../../data/Repository/__generated-types/Repositories'
import StatusColumn, {
  StatusColumnProps,
  reduceStatusColumnProps
} from './StatusColumn'
import {
  Repository,
  Repository_object,
  Repository_object_Blob
} from '../../data/Repository/__generated-types/Repository'
import { RepositoriesQuery_organization_repositories_nodes } from '../../data/Repository/__generated-types/RepositoriesQuery'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'

export interface ProjectsTableProps {
  projects: RepositoriesQuery_organization_repositories_nodes[]
  libraries: LibrariesQuery_libraries[]
  onRowClick?: (project: Repositories_nodes) => void
}

const ProjectsTable = React.memo<ProjectsTableProps>(props => {
  const librariesMap = React.useMemo(
    () =>
      props.libraries.reduce<Record<any, LibrariesQuery_libraries>>(
        (acc, library) => {
          acc[library.name] = library
          return acc
        },
        {}
      ),
    [props.libraries]
  )
  const handleRowClick = React.useCallback(
    ({ index }: Index) => props.onRowClick!(props.projects[index]),
    [props.projects]
  )
  const rowGetter = React.useCallback(
    ({ index }: Index) => props.projects[index],
    [props.projects]
  )
  const renderOutdated = React.useCallback(
    ({ cellData }: TableCellProps<'object', Repository>) => {
      if (!cellData || !isBlob(cellData) || !cellData.package) return null
      const statusProps = cellData.package.dependencies.reduce<
      StatusColumnProps
      >(
        (acc, dependency) =>
          reduceStatusColumnProps(
            acc,
            librariesMap[dependency.name].version,
            dependency.version
          ),
        { outDated: 0, alerts: 0 }
      )
      return <StatusColumn {...statusProps} />
    },
    [props.projects]
  )
  return (
    <Table
      rowCount={props.projects.length}
      rowGetter={rowGetter}
      onRowClick={props.onRowClick && handleRowClick}
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
})

const renderDate = ({ cellData }: { cellData?: string }) =>
  cellData ? dateFormatter.format(Date.parse(cellData)) : null

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

function isBlob (object: Repository_object): object is Repository_object_Blob {
  return object.__typename === 'Blob'
}

export default ProjectsTable
