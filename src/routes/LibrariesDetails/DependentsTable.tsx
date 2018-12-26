import React from 'react'
import Tag from '../../components/Tag'
import Table, { Column, Index, TableCellProps } from '../../components/Table'
import versionDiff from '../../utils/version-diff'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import gql from 'graphql-tag'
import { DependentsTableItem } from './__generated-types/DependentsTableItem'

gql`
  fragment DependentsTableItem on BidaNodeLibraryDependent {
    id
    version
    name
  }
`

export interface DependentsTableProps {
  dependents: DependentsTableItem[]
  libraryVersion: string
  baseUrl?: string
}
const DependentsTable = ({
  dependents,
  baseUrl,
  libraryVersion
}: DependentsTableProps) => {
  const handleRowGetter = React.useCallback(
    ({ index }: Index) => dependents[index],
    [dependents]
  )
  const renderVersion = React.useCallback(
    ({ cellData }: TableCellProps<'version', DependentsTableItem>) => {
      if (!cellData) return null
      switch (versionDiff(libraryVersion, cellData)) {
        case 'major':
          return <Tag critical>{cellData}</Tag>
        case 'minor':
          return <Tag warning>{cellData}</Tag>
        default:
          return <Tag>{cellData}</Tag>
      }
    },
    [libraryVersion]
  )
  return (
    <Table
      rowCount={dependents.length}
      rowGetter={handleRowGetter}
      rowRenderer={anchorRowRenderer(baseUrl, getRepositoryId)}
    >
      <Column width={380} label='Project Name' dataKey='name' />
      <Column
        width={280}
        dataKey='version'
        label='Used Version'
        cellRenderer={renderVersion}
      />
    </Table>
  )
}

const getRepositoryId = (dependent: DependentsTableItem) =>
  dependent.id.split(':')[0]

export default React.memo(DependentsTable)
