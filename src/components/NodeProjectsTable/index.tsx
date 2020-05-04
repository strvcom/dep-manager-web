import React, { memo, useMemo } from 'react'
import mem from 'mem'
import { propEq, prop, sum } from 'ramda'

import Table, { Column } from '../Table/index'
import StatusColumn from '../Table/StatusColumn'
import { BidaDepartment } from '~app/config/types'
import * as routes from '~app/routes/routes'
import anchorRowRenderer from '~app/utils/anchorRowRenderer'
import { useSort, UseSortOptions } from '~app/hooks/useSort'

import { GT } from '~api/client'
import { SemverOutdateStatus as distances } from '~generated/types'

type Project = GT.NodeProjectsTable_projectsFragment

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendProjects,
  [BidaDepartment.FRONTEND]: routes.frontendProjects,
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

interface NodeProjectsTableProps {
  cacheKey?: string
  projects: Project[]
  department: string
}

interface IOutdatedCounts {
  [distance: string]: number
}

interface NormalizedProject extends Pick<Project, 'name' | 'pushedAt'> {
  outdated: IOutdatedCounts
  totalOutdated: number
}

const renderPushedAt = ({ cellData }: { cellData?: string }): string =>
  !cellData ? '' : dateFormatter.format(Date.parse(cellData))

const renderOutdated = ({ rowData: { outdated } }: { rowData: { outdated: IOutdatedCounts } }) => (
  <StatusColumn outDated={outdated[distances.MAJOR]} alerts={outdated[distances.MINOR]} />
)

/**
 * Flattens and processes a project data for easier display and sort operations.
 */
const normalizeProject = mem(
  (project: Project) => {
    const name = project.name
    const pushedAt = project.pushedAt

    const dependencies = project.npmPackage?.dependencies || []

    const outdated = {} as IOutdatedCounts

    for (const distance of Object.keys(distances)) {
      outdated[distance] = dependencies.filter(propEq('outdateStatus', distance)).length
    }

    const totalOutdated = sum(Object.values(outdated))

    return { name, pushedAt, outdated, totalOutdated }
  },
  { cacheKey: prop('name') }
)

const sortDefaults: UseSortOptions<NormalizedProject> = {
  list: [],
  sortBy: 'pushedAt',
  sortDirection: 'DESC',
}

const NodeProjectsTable = ({ projects, department, cacheKey }: NodeProjectsTableProps) => {
  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(() => projects.map(normalizeProject), cacheKeys)

  // state

  const [sorted, setSort, { sortBy, sortDirection }] = useSort({ ...sortDefaults, list, cacheKeys })

  const baseURL = departmentBaseURLs[department.toUpperCase()]
  const rowGetter = ({ index }: { index: number }): NormalizedProject => sorted[index]
  const renderRow = baseURL ? anchorRowRenderer(baseURL, 'name') : undefined

  return (
    <Table
      sort={setSort}
      sortBy={sortBy}
      sortDirection={sortDirection}
      rowCount={projects.length}
      rowGetter={rowGetter}
      rowRenderer={renderRow}
    >
      <Column width={380} label="Project Name" dataKey="name" />

      <Column width={180} label="Last Active" dataKey="pushedAt" cellRenderer={renderPushedAt} />

      <Column
        width={200}
        label="Outdated Libraries"
        dataKey="totalOutdated"
        cellRenderer={renderOutdated}
      />
    </Table>
  )
}

export default memo(
  NodeProjectsTable,
  ({ cacheKey: prev }: NodeProjectsTableProps, { cacheKey: next }: NodeProjectsTableProps) =>
    prev ? prev === next : false
)
