import React from 'react'
import Tag from '../components/Tag'
import Table, {
  Column,
  TableCellProps,
  TableCellDataGetterParams,
  Index
} from '../components/Table'
import versionDiff from '../utils/version-diff'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { isValidLicense } from '../data/Library/index'
import gql from 'graphql-tag'
import { NodeProjectDependenciesTableItem } from './__generated-types/NodeProjectDependenciesTableItem'
import { BidaDepartment } from '../data/__generated-types'
import * as routes from '../routes/routes'

gql`
  fragment NodeProjectDependenciesTableItem on BidaNodeProjectDependency {
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

const departmentToBaseURL = (department: BidaDepartment) => {
  switch (department) {
    case BidaDepartment.BACKEND:
      return routes.backendLibraries
    case BidaDepartment.FRONTEND:
      return routes.frontendLibraries
    default:
      return null
  }
}

export interface NodeProjectDependenciesTableProps {
  dependencies: NodeProjectDependenciesTableItem[]
  department: BidaDepartment
}
const NodeProjectDependenciesTable = ({
  dependencies,
  department
}: NodeProjectDependenciesTableProps) => {
  const handleRowGetter = React.useCallback(
    ({ index }: Index) => dependencies[index],
    [dependencies]
  )
  const baseURL = departmentToBaseURL(department)
  return (
    <Table
      rowCount={dependencies.length}
      rowGetter={handleRowGetter}
      rowRenderer={
        baseURL ? anchorRowRenderer(baseURL, getLibraryId) : undefined
      }
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

const getLibraryId = (dependency: NodeProjectDependenciesTableItem) =>
  dependency.id.split(':')[0]

const renderUpToDateVersion = ({
  rowData
}: TableCellDataGetterParams<'library', NodeProjectDependenciesTableItem>) => {
  return rowData.library.version
}

const renderDependencyVersion = ({
  cellData,
  rowData
}: TableCellProps<'library', NodeProjectDependenciesTableItem>) => {
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
}: TableCellProps<'library', NodeProjectDependenciesTableItem>) =>
  cellData &&
  cellData.license && (
    <Tag critical={!isValidLicense(cellData.license)}>{cellData.license}</Tag>
  )

export default React.memo(NodeProjectDependenciesTable)
