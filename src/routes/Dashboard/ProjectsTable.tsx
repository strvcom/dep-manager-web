import React from 'react'
import { useProjects } from '../../data/Repository'
import Table, { Column, Index } from '../../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import { Project, Department } from '../../config/types'

export interface ProjectTableProps {
  department: Department
  onRowClick?: (project: Project) => void
}

export const ProjectsTable = React.memo<ProjectTableProps>(props => {
  const { data: projects, errors } = useProjects(props.department)
  if (errors) return null
  if (!projects) return null
  const handleRowClick = React.useCallback(
    ({ index }: Index) => props.onRowClick!(projects[index]),
    [projects]
  )
  const rowGetter = React.useCallback(({ index }: Index) => projects[index], [
    projects
  ])
  return (
    <Table
      rowCount={projects.length}
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
      {/* <Column
        width={200}
        label='Outdated Libraries'
        dataKey='status'
        cellRenderer={cellProps => <StatusCell {...cellProps} />}
      /> */}
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
