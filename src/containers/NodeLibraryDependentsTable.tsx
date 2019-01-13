import React from 'react'
import Tag from '../components/Tag'
import Table, { Column, Index, TableCellProps } from '../components/Table/index'
import versionDiff from '../utils/version-diff'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import gql from 'graphql-tag'
import { NodeLibraryDependentsTableItem } from './__generated-types/NodeLibraryDependentsTableItem'
import { BidaDepartment } from '../data/__generated-types'
import * as routes from '../routes/routes'

gql`
  fragment NodeLibraryDependentsTableItem on BidaNodeLibraryDependent {
    id
    version
    name
  }
`

export interface NodeLibraryDependentsTableProps {
  dependents: NodeLibraryDependentsTableItem[]
  libraryVersion: string
  department: BidaDepartment
}
const NodeLibraryDependentsTable = ({
  dependents,
  libraryVersion,
  department
}: NodeLibraryDependentsTableProps) => {
  const baseURL = departmentToBaseURL(department)
  const handleRowGetter = React.useCallback(
    ({ index }: Index) => dependents[index],
    [dependents]
  )
  const renderVersion = React.useCallback(
    ({
      cellData
    }: TableCellProps<'version', NodeLibraryDependentsTableItem>) => {
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
      rowRenderer={
        baseURL ? anchorRowRenderer(baseURL, getRepositoryId) : undefined
      }
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

const getRepositoryId = (dependent: NodeLibraryDependentsTableItem) =>
  dependent.id.split(':')[0]

const departmentToBaseURL = (department: BidaDepartment) => {
  switch (department) {
    case BidaDepartment.BACKEND:
      return routes.backendProjects
    case BidaDepartment.FRONTEND:
      return routes.frontendProjects
    default:
      return null
  }
}

export default React.memo(NodeLibraryDependentsTable)
