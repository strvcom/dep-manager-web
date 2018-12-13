import React from 'react'
import Tag from '../../components/Tag'
import Table, {
  Column,
  TableCellDataGetterParams,
  TableCellProps,
  Index
} from '../../components/Table'
import { RepositoryQuery_repository_object_Blob_package_dependencies } from '../../data/Repository/__generated-types/RepositoryQuery'
import versionDiff from '../../utils/version-diff'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import { isValidLicense } from '../../data/Library/index'

type Dependency = RepositoryQuery_repository_object_Blob_package_dependencies

export interface DependenciesTableProps {
  dependencies: Dependency[]
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
        cellDataGetter={renderLibraryVersion}
        width={280}
        label='Up To Date Version'
        dataKey='library version'
      />
      <Column
        width={280}
        label='Current version'
        dataKey='version'
        cellRenderer={renderDependencyVersion}
      />
      <Column
        cellRenderer={renderLicense}
        width={150}
        label='License'
        dataKey='license'
      />
    </Table>
  )
}

const getLibraryId = (dependency: Dependency) => dependency.id.split(':')[0]

const renderLibraryVersion = ({
  rowData
}: TableCellDataGetterParams<'library', Dependency>) => rowData.library.version

const renderDependencyVersion = ({
  cellData,
  rowData
}: TableCellProps<'version', Dependency>) => {
  if (!cellData) return null
  switch (versionDiff(rowData.library.version, cellData)) {
    case 'major':
      return <Tag critical>{cellData}</Tag>
    case 'minor':
      return <Tag warning>{cellData}</Tag>
    default:
      return <Tag>{cellData}</Tag>
  }
}

const renderLicense = ({
  rowData
}: TableCellDataGetterParams<'library', Dependency>) => (
  <Tag critical={!isValidLicense(rowData.library.license)}>
    {rowData.library.license}
  </Tag>
)

export default React.memo(DependenciesTable)
