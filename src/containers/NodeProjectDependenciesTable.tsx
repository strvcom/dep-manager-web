import React, { memo, useMemo } from 'react'
import mem from 'mem'
import { ascend, path, prop } from 'ramda'

import Tag from '../components/Tag'
import Table, { Column } from '../components/Table'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { isValidLicense } from '../utils/license'
import { BidaDepartment } from '../config/types'
import * as routes from '../routes/routes'

import { useSort } from '../hooks/useSort'

export interface Props {
  cacheKey?: string
  dependencies: any[]
  department: BidaDepartment
}

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendLibraries,
  [BidaDepartment.FRONTEND]: routes.frontendLibraries
}

const defaultSort = ascend(prop('name'))

const renderVersion = mem(
  ({ rowData: { currentVersion, outdateStatus } }: any) => (
    <Tag
      critical={outdateStatus === 'MAJOR'}
      warning={outdateStatus === 'MINOR'}
    >
      {currentVersion}
    </Tag>
  ),
  {
    cacheKey: ({ rowData: { version, outdateStatus } }: any) =>
      version + outdateStatus
  }
)

const renderLicense = mem(
  ({ cellData: license }: any) =>
    license && <Tag critical={!isValidLicense(license)}>{license}</Tag>,
  { cacheKey: prop('cellData') }
)

/**
 * Flattens and processes a dependency data for easier display and sort operations.
 */
const normalize = mem(
  (dependency: any) => ({
    outdateStatus: dependency.outdateStatus,
    currentVersion: dependency.version,
    name: dependency.package.name,
    version: dependency.package.version,
    license: dependency.package.license
  }),
  { cacheKey: prop('id') }
)

const NodeProjectDependenciesTable = ({
  cacheKey,
  dependencies,
  department
}: Props) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(() => dependencies.map(normalize), cacheKeys)

  // state

  const [sorted, setSort, sort] = useSort({
    list,
    cacheKeys,
    defaultSort,
    initial: { sortBy: 'name', sortDirection: 'ASC' }
  })

  // renderers.

  const rowGetter = ({ index }: { index: number }) => sorted[index]

  const baseURL = departmentBaseURLs[department]
  const rowRenderer = baseURL
    ? anchorRowRenderer(baseURL, prop('name'))
    : undefined

  return (
    <Table
      sort={setSort}
      sortBy={sort.sortBy}
      sortDirection={sort.sortDirection}
      rowCount={dependencies.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} label='Library Name' dataKey='name' />

      <Column
        width={280}
        label='Up To Date Version'
        dataKey='version'
        disableSort
      />

      <Column
        width={280}
        label='Current version'
        dataKey='currentVersion'
        cellRenderer={renderVersion}
        disableSort
      />

      <Column
        width={150}
        label='License'
        dataKey='license'
        cellRenderer={renderLicense}
      />
    </Table>
  )
}

export default memo(NodeProjectDependenciesTable, (prev: Props, next: Props) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
