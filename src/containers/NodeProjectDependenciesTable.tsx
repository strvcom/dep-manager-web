import React, { memo } from 'react'
import { path } from 'ramda'
import mem from 'mem'

import Tag from '../components/Tag'
import Table, { Column } from '../components/Table'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { isValidLicense } from '../data/Library/index'
import { BidaDepartment } from '../config/types'
import * as routes from '../routes/routes'

export interface Props {
  dependencies: any[]
  department: BidaDepartment
}

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendLibraries,
  [BidaDepartment.FRONTEND]: routes.frontendLibraries
}

const renderVersion = mem(
  ({ cellData: { version, outdateStatus } }: any) => (
    <Tag
      critical={outdateStatus === 'MAJOR'}
      warning={outdateStatus === 'MINOR'}
    >
      {version}
    </Tag>
  ),
  {
    cacheKey: ({ cellData: { version, outdateStatus } }: any) =>
      version + outdateStatus
  }
)

const renderLicense = mem(
  ({ cellData: license }: any) =>
    license && <Tag critical={!isValidLicense(license)}>{license}</Tag>,
  { cacheKey: ({ cellData: license }: any) => license }
)

const NodeProjectDependenciesTable = ({ dependencies, department }: Props) => {
  const baseURL = departmentBaseURLs[department]

  const rowGetter = ({ index }: { index: number }) => dependencies[index]

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
        cellDataGetter={path(['rowData'])}
      />

      <Column
        width={150}
        label='License'
        dataKey='license'
        cellRenderer={renderLicense}
        cellDataGetter={path(['rowData', 'package', 'license'])}
      />
    </Table>
  )
}

export default memo(NodeProjectDependenciesTable)
