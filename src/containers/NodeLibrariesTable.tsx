import React, { memo } from 'react'
import { path, pipe } from 'ramda'
import mem from 'mem'

import Table, { Column } from '../components/Table/index'
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
  (prev, next) => prev.library === next.library
)

const renderLicense = mem(
  pipe(
    path(['rowData', 'package', 'license']),
    (license: any) =>
      license ? <Tag critical={!isValidLicense(license)}>{license}</Tag> : null
  ),
  { cacheKey: path(['rowData', 'package', 'license']) }
)

const NodeLibrariesTable = ({ libraries, outdates }: Props) => {
  const rowGetter = ({ index }: { index: number }) => libraries[index]

  const renderUsage = ({ rowData }: any) => (
    <Usage library={rowData.package.name} outdates={outdates} />
  )

  const renderName = ({ rowData }: any) => rowData.package.name

  const renderOutdated = ({ rowData }: any) => (
    <Outdated library={rowData.package.name} outdates={outdates} />
  )

  const rowRenderer = React.useMemo(
    () =>
      anchorRowRenderer(
        routes.frontendLibraries,
        rowData => rowData.package.name
      ),
    [routes.frontendLibraries]
  )

  return (
    <Table
      rowCount={libraries.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column
        width={380}
        flexGrow={1}
        label='Library Name'
        dataKey='package'
        cellRenderer={renderName}
      />

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
