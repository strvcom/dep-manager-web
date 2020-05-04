import React, { memo, useMemo, FunctionComponent } from 'react'
import mem from 'mem'

import {
  descend,
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
import { GT } from '~api/client'

type Library = GT.NodeLibraryTable_LibraryFragment
type Package = Library['package']

enum Distances {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
}

type Outdates = Record<string, Package[]>
type OutdateCounts = Record<string, number>

interface NormalizedLibrary {
  name: string
  license: string
  outdates: OutdateCounts
  totalOutdates: number
  usage: number
}

export interface NodeLibrariesTableProps {
  cacheKey?: string // key for verifying memoization
  libraries: Library[]
  outdates: Outdates
}

const defaultSort = descend(prop('usage'))

const sumObject = pipe<Record<Distances, number>, number[], number>(values, sum)

const sumOutdates = pipe<OutdateCounts, OutdateCounts, number>(
  pick(Object.values(Distances)) as (obj: object) => Record<Distances, number>,
  sumObject
)

/**
 * Flattens and processes a library data for easier display and sort operations.
 */
const normalizeLibrary = mem(
  (library: Library, allOutdates: Outdates): NormalizedLibrary => {
    const name = library.package.name
    const license = library.package.license || ''

    const outdates: OutdateCounts = map(
      pipe<Package[], Package[], number>(filter(propEq('name', name)), len),
      allOutdates
    )
    return {
      name,
      license,
      outdates,
      totalOutdates: sumOutdates(outdates),
      usage: sumObject(outdates),
    }
  },
  { cacheKey: path(['package', 'name']) }
)

const renderRow = anchorRowRenderer<'name'>(routes.frontendLibraries, prop('name'))

const renderOutdates = ({ rowData: { outdates } }: { rowData: { outdates: OutdateCounts } }) => (
  <StatusColumn outDated={outdates[Distances.MAJOR]} alerts={outdates[Distances.MINOR]} />
)

const renderLicense = ({ cellData }: { cellData?: string }) =>
  cellData ? (
    <Badge type={!isValidLicense(cellData) ? BadgeType.DANGER : null}>{cellData}</Badge>
  ) : null

const NodeLibrariesTable: FunctionComponent<NodeLibrariesTableProps> = ({
  libraries,
  outdates,
  cacheKey,
}: NodeLibrariesTableProps) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    // broken for better memoization.
    () => libraries.map((library) => normalizeLibrary(library, outdates)),
    cacheKeys
  )

  // state

  const [sorted, setSort, { sortBy, sortDirection }] = useSort({
    list,
    cacheKeys,
    defaultSort,
    sortBy: 'usage',
    sortDirection: 'DESC',
  })

  // renderers.

  const rowGetter = ({ index }: { index: number }): NormalizedLibrary => sorted[index]

  return (
    <Table
      sort={setSort}
      sortBy={sortBy}
      sortDirection={sortDirection}
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

export default memo(
  NodeLibrariesTable,
  (prev: NodeLibrariesTableProps, next: NodeLibrariesTableProps) =>
    prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
