import React from 'react'
import { useProjects } from '../../data/Repository/hooks'
import Table, { Column, Index } from '../../components/Table'
// import StatusCell from '../../components/Tables/StatusCell'
import { Department } from '../routes'
import { Project } from '../../data/types'

export interface ProjectTableProps {
  department: Department
  onRowClick?: (project: Project) => void
}

function useRowGetter (projects: Project[]) {
  return React.useCallback(({ index }: Index) => projects[index], [projects])
}

export const ProjectTable = React.memo<ProjectTableProps>(props => {
  const { data: projects, errors } = useProjects(props.department)
  if (errors) return null
  if (!projects) return null
  const handleRowClick = React.useCallback(
    ({ index }: Index) => props.onRowClick!(projects[index]),
    []
  )
  return (
    <Table
      rowCount={projects.length}
      rowGetter={useRowGetter(projects)}
      onRowClick={props.onRowClick && handleRowClick}
    >
      <Column width={380} label='Name' dataKey='name' />
      <Column width={180} label='Last Active' dataKey='pushedAt' />
      {/* <Column
        width={200}
        label='Outdated Libraries'
        dataKey='status'
        cellRenderer={cellProps => <StatusCell {...cellProps} />}
      /> */}
      <Column width={360} label='Github Username' dataKey='collaborators' />
    </Table>
  )
})
