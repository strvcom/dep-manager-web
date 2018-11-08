import React from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'
import { RouteComponentProps } from 'react-router-dom'
import { Wrapper, CurrentVersion } from './styled'

const RelatedProjects = ({
  history,
  match: { params },
  relatedProjects,
}: RelatedProjectsProps) => (
  <Wrapper>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          // eslint-disable-next-line no-mixed-operators
          height={50 + 75 * relatedProjects.length}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 ? 'row' : ''}
          rowCount={relatedProjects.length}
          rowGetter={({ index }) => relatedProjects[index]}
          onRowClick={({ rowData }: any) => {
            history.push(`/${params.department}/project/${rowData.projectName}`)
          }}
        >
          <Column width={280} label="Project Name" dataKey="projectName" />
          <Column width={180} label="Latest version" dataKey="latestVersion" />
          <Column
            width={180}
            label="Current version"
            dataKey="currentVersion"
            cellRenderer={({ cellData, rowData }) => (
              <CurrentVersion status={rowData.status}>
                {cellData}
              </CurrentVersion>
            )}
          />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
)

export interface RelatedProjectsProps
  extends RouteComponentProps<{ department: string }> {
  relatedProjects: any
}

export default React.memo(RelatedProjects)
