import React, { memo, useMemo } from 'react'
import mem from 'mem'
import { path, prop } from 'ramda'

import Tag from '../components/Tag'
import Table, { Column } from '../components/Table/index'
import { versionDistance } from '../utils/version-diff'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { BidaDepartment } from '../config/types'
import * as routes from '../routes/routes'

export interface Props {
  cacheKey?: string
  dependents: any[]
  libraryVersion: string
  department: BidaDepartment
}

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendProjects,
  [BidaDepartment.FRONTEND]: routes.frontendProjects
}

const renderVersion = ({ rowData: { distance, version } }: any) => (
  <Tag critical={distance === 'MAJOR'} warning={distance === 'MINOR'}>
    {version}
  </Tag>
)

/**
 * Flattens and processes a dependent data for easier display and sort operations.
 */
const normalize = mem(
  (dependent: any, libraryVersion: string) => ({
    name: dependent.node.repository.name,
    version: dependent.node.version,
    distance: versionDistance(libraryVersion, dependent.node.version)
  }),
  { cacheKey: path(['node', 'id']) }
)

const NodeLibraryDependentsTable = ({
  cacheKey,
  dependents,
  libraryVersion,
  department
}: Props) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    () => dependents.map(dep => normalize(dep, libraryVersion)),
    cacheKeys
  )

  // renderers.

  const rowGetter = ({ index }: { index: number }) => list[index]

  const baseURL = departmentBaseURLs[department]
  const rowRenderer = baseURL
    ? anchorRowRenderer(baseURL, prop('name'))
    : undefined

  return (
    <Table
      rowCount={dependents.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
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

export default memo(NodeLibraryDependentsTable, (prev: Props, next: Props) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
