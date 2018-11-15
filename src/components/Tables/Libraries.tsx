import React from 'react'
import Table, { Column } from '../Table'
import { RouteComponentProps } from 'react-router-dom'
import StatusCell from './StatusCell'

const Libraries = ({
  history,
  match: { params },
  libraries
}: LibrariesProps) => (
  <Table
    rowCount={libraries.length}
    rowGetter={({ index }) => libraries[index]}
    onRowClick={({ rowData }: any) => {
      history.push(
        `/${params.department}/library/${rowData.name.replace('/', '%2f')}`
      )
    }}
  >
    <Column width={380} label='Name' dataKey='name' />
    <Column width={200} label='Group' dataKey='group' />
    <Column width={180} label='Total Used On' dataKey='totalUsed' />
    <Column
      width={360}
      label='Outdated Projects'
      dataKey='status'
      cellRenderer={props => <StatusCell {...props} />}
    />
  </Table>
)

export interface LibrariesProps
  extends RouteComponentProps<{ department: string }> {
  libraries: any
}

export default React.memo(Libraries)
