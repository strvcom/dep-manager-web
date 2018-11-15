import React from 'react'
import Table, { Column } from '../../components/Table'
import { RouteComponentProps } from 'react-router-dom'
import StatusCell from './StatusCell'

const Projects = ({ history, match: { params }, projects }: ProjectsProps) => (
  <Table
    rowCount={projects.length}
    rowGetter={({ index }) => projects[index]}
    onRowClick={({ rowData }: any) => {
      history.push(`/${params.department}/project/${rowData.name}`)
    }}
  >
    <Column width={380} label='Name' dataKey='name' />
    <Column width={180} label='Last Active' dataKey='pushedAt' />
    <Column
      width={200}
      label='Outdated Libraries'
      dataKey='status'
      cellRenderer={props => <StatusCell {...props} />}
    />
    <Column width={360} label='Github Username' dataKey='contributors' />
  </Table>
)

export interface ProjectsProps
  extends RouteComponentProps<{ department: string }> {
  projects: any
}

export default React.memo(Projects)
