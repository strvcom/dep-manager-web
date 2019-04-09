import React, { memo } from 'react'

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

const Outdated = memo(
  ({ library: { name }, outdates }: any) => {
    const { [distances.MAJOR]: major, [distances.MINOR]: minor } = outdates

    const majors = major.filter((lib: any) => lib.name === name)
    const minors = minor.filter((lib: any) => lib.name === name)

    return <StatusColumn outDated={majors.length} alerts={minors.length} />
  },
  (prev, next) => prev.rowData.name === next.rowData.name
)

const NodeLibrariesTable = ({ libraries, outdates }: Props) => {
  const renderOutdated = ({ rowData }: any) => (
    <Outdated library={rowData} outdates={outdates} />
  )

  const rowRenderer = React.useMemo(
    () => anchorRowRenderer(routes.frontendLibraries, 'id'),
    [routes.frontendLibraries]
  )

  const rowGetter = React.useCallback(({ index }: Index) => libraries[index], [
    libraries
  ])

  return (
    <Table
      rowCount={libraries.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} flexGrow={1} label='Library Name' dataKey='name' />

      <Column width={80} label='Total Used On' dataKey='totalDependents' />

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

const renderLicense = ({ rowData }: any) =>
  rowData.license && (
    <Tag critical={!isValidLicense(rowData.license)}>{rowData.license}</Tag>
  )

export default memo(NodeLibrariesTable)
