import React from 'react'
import Tag from '../../components/Tag'
import Table, { Column, Index, TableCellProps } from '../../components/Table'
import versionDiff from '../../utils/version-diff'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import { LibraryQuery_library_dependents } from '../../data/Library/__generated-types/LibraryQuery'

type Dependent = LibraryQuery_library_dependents

export interface DependentsTableProps {
  dependents: Dependent[]
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
    ({ cellData }: TableCellProps<'version', Dependent>) => {
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

const getRepositoryId = (dependent: Dependent) => dependent.id.split(':')[0]

export default React.memo(DependentsTable)
