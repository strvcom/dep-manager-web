import React, { memo } from 'react'

import Tag from '../components/Tag'
import Table, { Column } from '../components/Table/index'
import { versionDistance } from '../utils/version-diff'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { BidaDepartment } from '../data/__generated-types'
import * as routes from '../routes/routes'

export interface Props {
  dependents: any[]
  libraryVersion: string
  department: BidaDepartment
}

const Outdated = memo(
  ({ current, target }: any) => {
    const distance = versionDistance(target, current)

    return (
      // @ts-ignore
      <Tag critical={distance === 'MAJOR'} warning={distance === 'MINOR'}>
        {current}
      </Tag>
    )
  },
  (prev, next) => prev.current + prev.target === next.current + next.target
)

const getRepositoryId = (dependent: any) => dependent.repository.name

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendProjects,
  [BidaDepartment.FRONTEND]: routes.frontendProjects
}

const NodeLibraryDependentsTable = ({
  dependents,
  libraryVersion,
  department
}: Props) => {
  const baseURL = departmentBaseURLs[department]

  const rowGetter = ({ index }: { index: number }) => dependents[index].node
  const renderName = ({ rowData }: any) => rowData.repository.name
  const renderVersion = ({ rowData }: any) => (
    <Outdated current={rowData.version} target={libraryVersion} />
  )

  const rowRenderer = baseURL
    ? anchorRowRenderer(baseURL, getRepositoryId)
    : undefined

  return (
    <Table
      rowCount={dependents.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column
        width={380}
        label='Project Name'
        dataKey='name'
        cellRenderer={renderName}
      />

      <Column
        width={280}
        dataKey='version'
        label='Used Version'
        cellRenderer={renderVersion}
      />
    </Table>
  )
}

export default memo(NodeLibraryDependentsTable)
