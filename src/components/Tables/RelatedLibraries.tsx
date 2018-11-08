import React from 'react'
import { AutoSizer, Table, Column } from 'react-virtualized'
import { RouteComponentProps } from 'react-router-dom'
import { Wrapper, CurrentVersion } from './styled'

const RelatedLibraries = ({
  history,
  match: { params },
  relatedLibraries,
}: RelatedLibrariesProps) => (
  <Wrapper>
    <AutoSizer disableHeight>
      {({ width }) => (
        <Table
          width={width}
          // eslint-disable-next-line no-mixed-operators
          height={50 + 75 * relatedLibraries.length}
          headerHeight={50}
          rowHeight={75}
          rowClassName={({ index }) => index >= 0 ? 'row' : ''}
          rowCount={relatedLibraries.length}
          rowGetter={({ index }) => relatedLibraries[index]}
          onRowClick={({ rowData }: any) => {
            history.push(`/${params.department}/library/${rowData.libraryName.replace(
              '/',
              '%2f',
            )}`)
          }}
        >
          <Column width={280} label="Library Name" dataKey="libraryName" />
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
          <Column width={100} label="Licence" dataKey="licence" />
        </Table>
      )}
    </AutoSizer>
  </Wrapper>
)

export interface RelatedLibrariesProps
  extends RouteComponentProps<{ department: string }> {
  relatedLibraries: any
}

export default React.memo(RelatedLibraries)
