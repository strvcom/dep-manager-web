import React from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'
import { RouteComponentProps } from 'react-router-dom'
import StatusCell from './StatusCell'
import { Wrapper } from './styled'
import './Table.css'

const Projects = ({ history, match: { params }, projects }: ProjectsProps) => (
  <Wrapper>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          // eslint-disable-next-line no-mixed-operators
          height={50 + 75 * projects.length}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 ? 'row' : ''}
          rowCount={projects.length}
          rowGetter={({ index }) => projects[index]}
          onRowClick={({ rowData }: any) => {
            history.push(`/${params.department}/project/${rowData.name}`)
          }}
        >
          <Column width={380} label="Name" dataKey="name" />
          <Column width={180} label="Last Active" dataKey="lastActive" />
          <Column
            width={200}
            label="Outdated Libraries"
            dataKey="status"
            cellRenderer={StatusCell}
          />
          <Column width={360} label="Github Username" dataKey="contributors" />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
)

export interface ProjectsProps
  extends RouteComponentProps<{ department: string }> {
  projects: any
}

export default Projects
