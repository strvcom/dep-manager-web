import React, { memo, useMemo } from 'react'
import mem from 'mem'
import { filter, length, map, path, pipe, propEq, sum, values } from 'ramda'

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
    // prettier-ignore
    const usage = pipe(values, sum)(outdates)

    return { name, license, outdates, usage }
  },
  { cacheKey: path(['package', 'name']) }
)

const rowRenderer = anchorRowRenderer(
  routes.frontendLibraries,
  ({ name }) => name
)

const NodeLibrariesTable = ({ libraries, outdates, cacheKey }: Props) => {
  // memoized normalization

  const normalized = useMemo(
    // broken for better memoization.
    () => libraries.map(library => normalizeLibrary(library, outdates)),
    [cacheKey]
  )

  // renderers.

  const rowGetter = ({ index }: { index: number }) => normalized[index]

  return (
    <Table
      rowCount={libraries.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />

      <Column width={80} label='Total Used On' dataKey='usage' />

      <Column
        width={180}
        label='Outdated Projects'
        dataKey='outdates'
        disableSort
        cellRenderer={({ cellData }: any) => (
          <StatusColumn
            outDated={cellData[distances.MAJOR]}
            alerts={cellData[distances.MINOR]}
          />
        )}
      />

      <Column
        flexGrow={1}
        width={100}
        label='License'
        dataKey='license'
        cellRenderer={({ cellData }: any) =>
          cellData ? (
            <Tag critical={!isValidLicense(cellData)}>{cellData}</Tag>
          ) : null
        }
      />
    </Table>
  )
}

export default memo(
  NodeLibrariesTable,
  (prev, next) => prev.cacheKey === next.cacheKey
)
