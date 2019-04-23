import React, { memo, useMemo } from 'react'
import mem from 'mem'
import {
  __,
  ascend,
  filter,
  length,
  map,
  pick,
  pipe,
  propEq,
  prop,
  sum,
  values
} from 'ramda'

import Table, { Column } from '../../components/Table/index'
import StatusColumn from '../../components/Table/StatusColumn'
import { BidaDepartment } from '../../config/types'
import * as routes from '../../routes/routes'
import anchorRowRenderer from '../../utils/anchorRowRenderer'

import { useSort, UseSortOptions } from '../../hooks/useSort'

const distances = {
  MAJOR: 'MAJOR',
  MINOR: 'MINOR'
}

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendProjects,
  [BidaDepartment.FRONTEND]: routes.frontendProjects
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

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
  cacheKey?: string
  projects: Project[]
  department: string
}

const renderPushedAt = ({ cellData }: any) =>
  cellData ? dateFormatter.format(Date.parse(cellData)) : null

const renderOutdated = ({ rowData: { outdated } }: any) => (
  <StatusColumn
    outDated={outdated[distances.MAJOR]}
    alerts={outdated[distances.MINOR]}
  />
)

const getOutdated = (dependencies: any[]) =>
  pipe(
    propEq('outdateStatus'),
    filter(__, dependencies),
    length
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
  (project: any) => {
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

const sortDefaults: UseSortOptions = {
  list: [],
  defaultSort: ascend(prop('name')),
  initial: { sortBy: 'name', sortDirection: 'ASC' }
}

const NodeProjectsTable = ({ projects, department, cacheKey }: Props) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(
    // broken for better memoization.
    () => projects.map(project => normalizeProject(project)),
    cacheKeys
  )

  // state

  const [sorted, setSort, sort] = useSort({ ...sortDefaults, list, cacheKeys })

  const rowGetter = ({ index }: { index: number }) => sorted[index]
  const baseURL = departmentBaseURLs[department.toUpperCase()]
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
      <Column width={380} label='Project Name' dataKey='name' />

      <Column
        width={180}
        label='Last Active'
        dataKey='pushedAt'
        cellRenderer={renderPushedAt}
      />

      <Column
        width={200}
        label='Outdated Libraries'
        dataKey='totalOutdated'
        cellRenderer={renderOutdated}
      />
    </Table>
  )
}

export default memo(NodeProjectsTable, (prev: Props, next: Props) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
