import React from 'react'
import Tag from '../../components/Tag'
import Table, {
  Column,
  TableCellProps,
  TableCellDataGetterParams,
  Index
} from '../../components/Table'
import versionDiff from '../../utils/version-diff'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import { isValidLicense } from '../../data/Library/index'
import gql from 'graphql-tag'
import { DependenciesTableItem } from './__generated-types/DependenciesTableItem'

gql`
  fragment DependenciesTableItem on BidaNodeProjectDependency {
    id
    name
    version
    library {
      id
      version
      license
    }
  }
`

export interface DependenciesTableProps {
  dependencies: DependenciesTableItem[]
  baseUrl?: string
}
const DependenciesTable = ({
  dependencies,
  baseUrl
}: DependenciesTableProps) => {
  const handleRowGetter = React.useCallback(
    ({ index }: Index) => dependencies[index],
    [dependencies]
  )
  return (
    <Table
      rowCount={dependencies.length}
      rowGetter={handleRowGetter}
      rowRenderer={anchorRowRenderer(baseUrl, getLibraryId)}
    >
      <Column width={380} label='Library Name' dataKey='name' />
      <Column
        width={280}
        label='Up To Date Version'
        dataKey='library'
        cellDataGetter={renderUpToDateVersion}
      />
      <Column
        width={280}
        label='Current version'
        dataKey='library'
        cellRenderer={renderDependencyVersion}
      />
      <Column
        cellRenderer={renderLicense}
        width={150}
        label='License'
        dataKey='library'
      />
    </Table>
  )
}

const getLibraryId = (dependency: DependenciesTableItem) =>
  dependency.id.split(':')[0]

const renderUpToDateVersion = ({
  rowData
}: TableCellDataGetterParams<'library', DependenciesTableItem>) => {
  return rowData.library.version
}

const renderDependencyVersion = ({
  cellData,
  rowData
}: TableCellProps<'library', DependenciesTableItem>) => {
  if (!cellData) return null
  switch (versionDiff(cellData.version, rowData.version)) {
    case 'major':
      return <Tag critical>{rowData.version}</Tag>
    case 'minor':
      return <Tag warning>{rowData.version}</Tag>
    default:
      return <Tag>{rowData.version}</Tag>
  }
}

const renderLicense = ({
  cellData
}: TableCellProps<'library', DependenciesTableItem>) =>
  cellData &&
  cellData.license && (
    <Tag critical={!isValidLicense(cellData.license)}>{cellData.license}</Tag>
  )

export default React.memo(DependenciesTable)
