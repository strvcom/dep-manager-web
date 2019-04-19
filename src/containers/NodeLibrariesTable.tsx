import React, { memo, useState, useMemo } from 'react'
import mem from 'mem'
import {
  ascend,
  descend,
  filter,
  length,
  map,
  path,
  pick,
  pipe,
  prop,
  propEq,
  sortWith,
  sum,
  values
} from 'ramda'

import Table, { Column } from '../components/Table/index'
import StatusColumn from '../components/Table/StatusColumn'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import Tag from '../components/Tag'
import * as routes from '../routes/routes'
import { isValidLicense } from '../utils/license'

const distances = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR'
}

export interface Props {
  cacheKey: string // key for verifying memoization
  libraries: any[]
  outdates: {
    MAJOR: any[]
    MINOR: any[]
  }
}

interface Sort {
  by: string | undefined
  direction: 'DESC' | 'ASC' | undefined
}

const sortDirections = {
  ASC: ascend,
  DESC: descend
}

// @ts-ignore
const defaultSort = ascend(prop('name'))

const sorter = (
  libraries: Props['libraries'],
  { by, direction = 'ASC' }: Sort
) =>
  sortWith(
    by ? [sortDirections[direction](prop(by)), defaultSort] : [defaultSort],
    libraries
  )

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
        length
      ),
      allOutdates
    )

    const totalOutdates = sumOutdates(outdates)
    const usage = sumObject(outdates)

    return { name, license, outdates, totalOutdates, usage }
  },
  { cacheKey: path(['package', 'name']) }
)

const rowRenderer = anchorRowRenderer(
  routes.frontendLibraries,
  ({ name }) => name
)

const renderOutdates = ({ rowData: { outdates } }: any) => (
  <StatusColumn
    outDated={outdates[distances.MAJOR]}
    alerts={outdates[distances.MINOR]}
  />
)

const renderLicense = ({ cellData }: any) =>
  cellData ? <Tag critical={!isValidLicense(cellData)}>{cellData}</Tag> : null

const NodeLibrariesTable = ({ libraries, outdates, cacheKey }: Props) => {
  // memoized normalization

  const normalizationCache = [cacheKey]
  const normalized = useMemo(
    // broken for better memoization.
    () => libraries.map(library => normalizeLibrary(library, outdates)),
    normalizationCache
  )

  // state

  const [sort, setSort] = useState<Sort>({ by: 'name', direction: 'ASC' })

  const sortCache = normalizationCache.concat(Object.values(sort))
  const sorted = useMemo(() => sorter(normalized, sort), sortCache)

  const handleSort = ({ sortBy: by, sortDirection: direction }: any) =>
    setSort({ by, direction })

  // renderers.

  const rowGetter = ({ index }: { index: number }) => sorted[index]

  return (
    <Table
      sort={handleSort}
      sortBy={sort.by}
      sortDirection={sort.direction}
      rowCount={libraries.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />

      <Column width={80} label='Total Used On' dataKey='usage' />

      <Column
        width={180}
        label='Outdated Projects'
        dataKey='totalOutdates'
        cellRenderer={renderOutdates}
      />

      <Column
        flexGrow={1}
        width={100}
        label='License'
        dataKey='license'
        cellRenderer={renderLicense}
      />
    </Table>
  )
}

export default memo(
  NodeLibrariesTable,
  (prev, next) => prev.cacheKey === next.cacheKey
)
