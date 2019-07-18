import React, { memo, useMemo } from 'react'
import mem from 'mem'
import { ascend, length as len, map, pick, pipe, propEq, prop, sum, values, Functor } from 'ramda'

import Table, { Column } from '../Table/index'
import StatusColumn from '../Table/StatusColumn'
import { BidaDepartment } from '../../config/types'
import * as routes from '../../routes/routes'
import anchorRowRenderer from '../../utils/anchorRowRenderer'

import { useSort, UseSortOptions } from '../../hooks/useSort'

import { SemverOutdateStatus as distances } from '../../generated/graphql-types'
import {
  NodeProjectsTable_projects as Project,
  NodeProjectsTable_projects_npmPackage_dependencies as IDependency,
} from './graphql-types/NodeProjectsTable_projects'

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

const getOutdated = (dependencies: Array<IDependency | null>) =>
  pipe<string, (value: IDependency | null) => boolean, Array<IDependency | null>, number>(
    propEq('outdateStatus'),
    propEqFilter => dependencies.filter(propEqFilter),
    len
  )

const sumOutdates = pipe(
  pick(Object.values(distances)),
  pipe<object, number[], number>(
    values,
    sum
  )
)

/**
 * Flattens and processes a project data for easier display and sort operations.
 */
const normalizeProject = mem(
  (project: Project): NormalizedProject => {
    const name = project.name
    const pushedAt = project.pushedAt

    const dependencies = (project.npmPackage && project.npmPackage.dependencies) || []
    const outdated = (map(getOutdated(dependencies), (distances as unknown) as Functor<
      distances
    >) as unknown) as IOutdatedCounts
    const totalOutdated = sumOutdates(outdated)

    return { name, pushedAt, outdated, totalOutdated }
  },
  { cacheKey: prop('name') }
)

const sortDefaults: UseSortOptions<NormalizedProject> = {
  list: [],
  defaultSort: ascend(prop('name')),
  sortBy: 'name',
  sortDirection: 'ASC',
}

const NodeProjectsTable = ({ projects, department, cacheKey }: NodeProjectsTableProps) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    // broken for better memoization.
    () => projects.map(project => normalizeProject(project)),
    cacheKeys
  )

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
