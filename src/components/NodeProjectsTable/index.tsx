import React, { memo, useMemo, FunctionComponent } from 'react'
import mem from 'mem'
import {
  __,
  ascend,
  filter,
  length as len,
  map,
  pick,
  pipe,
  propEq,
  prop,
  sum,
  values,
} from 'ramda'

import Table, { Column } from '../Table/index'
import StatusColumn from '../Table/StatusColumn'
import { BidaDepartment } from '../../config/types'
import * as routes from '../../routes/routes'
import anchorRowRenderer from '../../utils/anchorRowRenderer'

import { useSort, IUseSortOptions } from '../../hooks/useSort'

import { SemverOutdateStatus as distances } from '../../generated/graphql-types'
import {
  NodeProjectsTable_projects as IProject,
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

interface IProps {
  cacheKey?: string
  projects: IProject[]
  department: string
}

interface IOutdatedCounts {
  [distance: string]: number
}

interface INormalizedProject extends Pick<IProject, 'name' | 'pushedAt'> {
  outdated: IOutdatedCounts
  totalOutdated: number
}

const renderPushedAt = ({ cellData }: { cellData?: string }): string =>
  !cellData ? '' : dateFormatter.format(Date.parse(cellData))

const renderOutdated = ({
  rowData: { outdated },
}: {
  rowData: { outdated: IOutdatedCounts }
}): JSX.Element => (
  <StatusColumn
    outDated={outdated[distances.MAJOR]}
    alerts={outdated[distances.MINOR]}
  />
)

const getOutdated = (dependencies: (IDependency | null)[]): number =>
  pipe(
    propEq('outdateStatus'),
    filter(__, dependencies),
    len
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
 * Flattens and processes a project data for easier display and sort operations.
 */
const normalizeProject = mem(
  (project: IProject): INormalizedProject => {
    const name = project.name
    const pushedAt = project.pushedAt

    const dependencies =
      (project.npmPackage && project.npmPackage.dependencies) || []
    const outdated = map(getOutdated(dependencies), distances)
    const totalOutdated = sumOutdates(outdated)

    return { name, pushedAt, outdated, totalOutdated }
  },
  { cacheKey: prop('name') }
)

const sortDefaults: IUseSortOptions = {
  list: [],
  defaultSort: ascend(prop('name')),
  initial: { sortBy: 'name', sortDirection: 'ASC' },
}

const NodeProjectsTable: FunctionComponent<IProps> = ({
  projects,
  department,
  cacheKey,
}: IProps): JSX.Element => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    // broken for better memoization.
    () => projects.map(project => normalizeProject(project)),
    cacheKeys
  )

  // state

  const [sorted, setSort, sort] = useSort({ ...sortDefaults, list, cacheKeys })

  const baseURL = departmentBaseURLs[department.toUpperCase()]
  const rowGetter = ({ index }: { index: number }): INormalizedProject =>
    sorted[index]
  const renderRow = baseURL ? anchorRowRenderer(baseURL, 'name') : undefined

  return (
    <Table
      sort={setSort}
      sortBy={sort.sortBy}
      sortDirection={sort.sortDirection}
      rowCount={projects.length}
      rowGetter={rowGetter}
      rowRenderer={renderRow}
    >
      <Column width={380} label="Project Name" dataKey="name" />

      <Column
        width={180}
        label="Last Active"
        dataKey="pushedAt"
        cellRenderer={renderPushedAt}
      />

      <Column
        width={200}
        label="Outdated Libraries"
        dataKey="totalOutdated"
        cellRenderer={renderOutdated}
      />
    </Table>
  )
}

export default memo(NodeProjectsTable, (prev: IProps, next: IProps) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
