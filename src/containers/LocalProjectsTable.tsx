import React from 'react'
import Table, { Column, Index } from '../components/Table/index'
import gql from 'graphql-tag'
import { LocalProjectsTableItem } from './__generated-types/LocalProjectsTableItem'

gql`
  fragment LocalProjectsTableItem on BidaProject {
    name
    pushedAt
  }
`

export interface LocalProjectsTableProps {
  projects: LocalProjectsTableItem[]
}

const LocalProjectsTable = React.memo<LocalProjectsTableProps>(
  ({ projects }) => {
    const rowGetter = React.useCallback(({ index }: Index) => projects[index], [
      projects
    ])
    return (
      <Table rowCount={projects.length} rowGetter={rowGetter}>
        <Column width={380} label='Project Name' dataKey='name' />
        <Column
          width={180}
          label='Last Active'
          dataKey='pushedAt'
          cellRenderer={renderDate}
        />
      </Table>
    )
  }
)

const renderDate = ({ cellData }: { cellData?: string }) =>
  cellData ? dateFormatter.format(Date.parse(cellData)) : null

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export default LocalProjectsTable
