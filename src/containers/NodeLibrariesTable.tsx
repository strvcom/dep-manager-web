import React, { memo } from 'react'
import mem from 'mem'

import Table, { Column, Index } from '../components/Table/index'
import StatusColumn from '../components/Table/StatusColumn'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import Tag from '../components/Tag'
import * as routes from '../routes/routes'
import { isValidLicense } from '../data/Library/index'

const distances = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR'
}

export interface Props {
  libraries: any[]
  outdates: {
    MAJOR: any[]
    MINOR: any[]
  }
}

const Usage = memo(
  ({ library, outdates }: any) => (
    <span>
      {Object.keys(outdates).reduce(
        (acc, status) =>
          acc +
          outdates[status].filter((lib: any) => lib.name === library).length,
        0
      )}
    </span>
  ),
  (prev, next) => prev.name === next.name
)

const Outdated = memo(
  ({ library, outdates }: any) => {
    const { [distances.MAJOR]: major, [distances.MINOR]: minor } = outdates

    const majors = major.filter((lib: any) => lib.name === library)
    const minors = minor.filter((lib: any) => lib.name === library)

    return <StatusColumn outDated={majors.length} alerts={minors.length} />
  },
  (prev, next) => prev.name === next.name
)

const renderLicense = mem(
  ({ rowData: { license } }: any) =>
    license && <Tag critical={!isValidLicense(license)}>{license}</Tag>,
  { cacheKey: ({ rowData: { license } }: any) => license }
)

const NodeLibrariesTable = ({ libraries, outdates }: Props) => {
  const renderUsage = ({ rowData: { name } }: any) => (
    <Usage library={name} outdates={outdates} />
  )

  const renderOutdated = ({ rowData: { name } }: any) => (
    <Outdated library={name} outdates={outdates} />
  )

  const rowGetter = ({ index }: { index: number }) => libraries[index]

  const rowRenderer = React.useMemo(
    () => anchorRowRenderer(routes.frontendLibraries, 'name'),
    [routes.frontendLibraries]
  )

  return (
    <Table
      rowCount={libraries.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />

      <Column
        width={80}
        label='Total Used On'
        dataKey='id'
        cellRenderer={renderUsage}
      />

      <Column
        width={180}
        label='Outdated Projects'
        dataKey='id'
        cellRenderer={renderOutdated}
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

export default memo(NodeLibrariesTable)
