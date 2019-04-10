import React, { memo } from 'react'
import { path } from 'ramda'
import mem from 'mem'

import Tag from '../components/Tag'
import Table, { Column, TableCellProps } from '../components/Table'
import versionDiff from '../utils/version-diff'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { isValidLicense } from '../data/Library/index'
import { NodeProjectDependenciesTableItem } from './__generated-types/NodeProjectDependenciesTableItem'
import { BidaDepartment } from '../data/__generated-types'
import * as routes from '../routes/routes'

export interface Props {
  dependencies: any[]
  department: BidaDepartment
}

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendLibraries,
  [BidaDepartment.FRONTEND]: routes.frontendLibraries
}

const Outdated = memo(
  ({ version, outdateStatus }: any) => (
    <Tag
      critical={outdateStatus === 'MAJOR'}
      warning={outdateStatus === 'MINOR'}
    >
      {version}
    </Tag>
  ),
  (prev, next) =>
    prev.version + prev.outdateStatus === next.version + next.outdateStatus
)

const renderLicense = mem(
  ({ rowData: { license } }: any) =>
    license && <Tag critical={!isValidLicense(license)}>{license}</Tag>,
  { cacheKey: ({ rowData: { license } }: any) => license }
)

const NodeProjectDependenciesTable = ({ dependencies, department }: Props) => {
  const baseURL = departmentBaseURLs[department]

  const rowGetter = ({ index }: { index: number }) => dependencies[index]

  const renderVersion = ({ rowData: { version, outdateStatus } }: any) => (
    <Outdated version={version} outdateStatus={outdateStatus} />
  )

  const rowRenderer = baseURL
    ? anchorRowRenderer(baseURL, path(['package', 'name']) as () => string)
    : undefined

  return (
    <Table
      rowCount={dependencies.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column
        width={380}
        label='Library Name'
        dataKey='name'
        cellDataGetter={path(['rowData', 'package', 'name'])}
      />

      <Column
        width={280}
        label='Up To Date Version'
        dataKey='library'
        cellDataGetter={path(['rowData', 'package', 'version'])}
      />

      <Column
        width={280}
        label='Current version'
        dataKey='version'
        cellRenderer={renderVersion}
      />

      <Column
        width={150}
        label='License'
        dataKey='license'
        cellDataGetter={path(['rowData', 'package', 'license'])}
      />
    </Table>
  )
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

export default React.memo(NodeProjectDependenciesTable)
