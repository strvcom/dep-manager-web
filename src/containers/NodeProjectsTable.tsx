import React, { memo } from 'react'

import Table, { Column } from '../components/Table/index'
import StatusColumn from '../components/Table/StatusColumn'
import anchorRowRenderer from '../utils/anchorRowRenderer'
import { BidaDepartment } from '../data/__generated-types'
import * as routes from '../routes/routes'

const distances = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR'
}

interface Package {
  outdateStatus: string
}

interface Project {
  name: string
  npmPackage: null | {
    dependencies: Package[]
  }
}

interface Props {
  projects: Project[]
  department: string
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

const Outdated = memo(
  ({ project: { npmPackage } }: any) => {
    if (!npmPackage || !npmPackage.dependencies) return null

    const majors = npmPackage.dependencies.filter(
      ({ package: { outdateStatus } }: any) => outdateStatus === distances.MAJOR
    )

    const minors = npmPackage.dependencies.filter(
      ({ package: { outdateStatus } }: any) => outdateStatus === distances.MINOR
    )

    return <StatusColumn outDated={majors.length} alerts={minors.length} />
  },
  (prev, next) => prev.project.name === next.project.name
)

const LastUpdate = memo(
  ({ pushedAt }: { pushedAt: string }) => (
    <span>{pushedAt ? dateFormatter.format(Date.parse(pushedAt)) : null}</span>
  ),
  (prev, next) => prev.pushedAt === next.pushedAt
)

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendProjects,
  [BidaDepartment.FRONTEND]: routes.frontendProjects
}

const NodeProjectsTable = ({ projects, department }: Props) => {
  const baseURL = departmentBaseURLs[department.toUpperCase()]

  const renderDate = ({ rowData: { pushedAt } }: any) => (
    <LastUpdate pushedAt={pushedAt} />
  )

  const renderOutdated = ({ rowData }: any) => <Outdated project={rowData} />

  const rowGetter = ({ index }: { index: number }) => projects[index]

  const rowRenderer = baseURL ? anchorRowRenderer(baseURL, 'name') : undefined

  return (
    <Table
      rowCount={projects.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} label='Project Name' dataKey='name' />

      <Column
        width={180}
        label='Last Active'
        dataKey='pushedAt'
        cellRenderer={renderDate}
      />

      <Column
        width={200}
        label='Outdated Libraries'
        dataKey='id'
        cellRenderer={renderOutdated}
      />
    </Table>
  )
}

export default memo(NodeProjectsTable)
