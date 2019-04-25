import React, { memo, useMemo } from 'react'
import mem from 'mem'

import {
  ascend,
  filter,
  length as len,
  map,
  path,
  pick,
  pipe,
  prop,
  propEq,
  sum,
  values,
} from 'ramda'

import Table, { Column } from '../Table'
import StatusColumn from '../Table/StatusColumn'
import Badge, { BadgeType } from '../Badge'

import * as routes from '../../routes/routes'
import { isValidLicense } from '../../utils/license'
import anchorRowRenderer from '../../utils/anchorRowRenderer'

import { useSort } from '../../hooks/useSort'

const distances = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR',
}

export interface Props {
  cacheKey?: string // key for verifying memoization
  libraries: any[]
  outdates: {
    MAJOR: any[]
    MINOR: any[]
  }
}

const defaultSort = ascend(prop('name'))

const sumObject = pipe(
  values,
  sum
)

const sumOutdates = pipe(
  pick(Object.values(distances)),
  sumObject
)

/**
 * Flattens and processes a library data for easier display and sort operations.
 */
const normalizeLibrary = mem(
  (library: any, allOutdates: any) => {
    const name = library.package.name
    const license = library.package.license

    const outdates = map(
      pipe(
        filter(propEq('name', name)),
        // @ts-ignore
        len
      ),
      allOutdates
    )

    const totalOutdates = sumOutdates(outdates)
    const usage = sumObject(outdates)

    return { name, license, outdates, totalOutdates, usage }
  },
  { cacheKey: path(['package', 'name']) }
)

const renderRow = anchorRowRenderer(routes.frontendLibraries, prop('name'))

const renderOutdates = ({ rowData: { outdates } }: any) => (
  <StatusColumn
    outDated={outdates[distances.MAJOR]}
    alerts={outdates[distances.MINOR]}
  />
)

const renderLicense = ({ cellData }: any) =>
  cellData ? (
    <Badge type={!isValidLicense(cellData) ? BadgeType.DANGER : null}>
      {cellData}
    </Badge>
  ) : null

const NodeLibrariesTable = ({ libraries, outdates, cacheKey }: Props) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    // broken for better memoization.
    () => libraries.map(library => normalizeLibrary(library, outdates)),
    cacheKeys
  )

  // state

  const [sorted, setSort, sort] = useSort({
    list,
    cacheKeys,
    defaultSort,
    initial: { sortBy: 'name', sortDirection: 'ASC' },
  })

  // renderers.

  const rowGetter = ({ index }: { index: number }) => sorted[index]

  return (
    <Table
      sort={setSort}
      sortBy={sort.sortBy}
      sortDirection={sort.sortDirection}
      rowCount={libraries.length}
      rowGetter={rowGetter}
      rowRenderer={renderRow}
    >
      <Column width={5} flexGrow={5} label="Library Name" dataKey="name" />

      <Column width={2} flexGrow={2} label="Total Used On" dataKey="usage" />

      <Column
        width={3}
        flexGrow={3}
        label="Outdated Projects"
        dataKey="totalOutdates"
        cellRenderer={renderOutdates}
      />

      <Column
        width={1}
        flexGrow={1}
        label="License"
        dataKey="license"
        cellRenderer={renderLicense}
      />
    </Table>
  )
}

export default memo(NodeLibrariesTable, (prev: Props, next: Props) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
