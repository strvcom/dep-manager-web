import React, { memo, useMemo, FunctionComponent } from 'react'
import mem from 'mem'
import { ascend, prop } from 'ramda'

import Badge, { BadgeType } from '../Badge'
import Table, { Column } from '../Table'
import anchorRowRenderer from '../../utils/anchorRowRenderer'
import { isValidLicense } from '../../utils/license'
import { BidaDepartment } from '../../config/types'
import * as routes from '../../routes/routes'

import { useSort } from '../../hooks/useSort'

import {
  NodeProjectsDependenciesTable_dependencies as IDependency,
  NodeProjectsDependenciesTable_dependencies_package as IPackage,
} from './graphql-types/NodeProjectsDependenciesTable_dependencies'

interface INormalizedDependency {
  outdateStatus: IDependency['outdateStatus']
  currentVersion: IDependency['version']
  name: IPackage['name']
  version: IPackage['version']
  license: IPackage['license']
}

interface IProps {
  cacheKey?: string
  dependencies: IDependency[]
  department: BidaDepartment
}

const departmentBaseURLs = {
  [BidaDepartment.BACKEND]: routes.backendLibraries,
  [BidaDepartment.FRONTEND]: routes.frontendLibraries,
}

const defaultSort = ascend(prop('name'))

const versionBadgeType = {
  MAJOR: BadgeType.DANGER,
  MINOR: BadgeType.WARNING,
}

interface IRenderVersion {
  rowData: {
    currentVersion: string
    outdateStatus: string
  }
}

const renderVersion = mem(
  ({ rowData: { currentVersion, outdateStatus } }: IRenderVersion) => (
    <Badge type={versionBadgeType[outdateStatus]}>{currentVersion}</Badge>
  ),
  {
    cacheKey: ({ rowData: { currentVersion, outdateStatus } }: IRenderVersion): string =>
      currentVersion + outdateStatus,
  }
)

const renderLicense = mem(
  ({ cellData: license }: { cellData?: string }) =>
    !license ? null : (
      <Badge type={!isValidLicense(license) ? BadgeType.DANGER : null}>{license}</Badge>
    ),
  { cacheKey: prop('cellData') as (obj: { cellData?: string }) => string | undefined }
)

/**
 * Flattens and processes a dependency data for easier display and sort operations.
 */
const normalize = mem(
  (dependency: IDependency): INormalizedDependency => ({
    outdateStatus: dependency.outdateStatus,
    currentVersion: dependency.version,
    name: dependency.package.name,
    version: dependency.package.version,
    license: dependency.package.license,
  }),
  { cacheKey: prop('id') }
)

const NodeProjectDependenciesTable: FunctionComponent<IProps> = ({
  cacheKey,
  dependencies,
  department,
}: IProps) => {
  // memoized normalization

  const cacheKeys = cacheKey ? [cacheKey] : []
  const list = useMemo(() => dependencies.map(normalize), cacheKeys)

  // state

  const [sorted, setSort, sort] = useSort({
    list,
    cacheKeys,
    defaultSort,
    sortBy: 'name',
    sortDirection: 'ASC',
  })

  // renderers.

  const rowGetter = ({ index }: { index: number }): INormalizedDependency => sorted[index]

  const baseURL = departmentBaseURLs[department]
  const rowRenderer = baseURL ? anchorRowRenderer<'name'>(baseURL, prop('name')) : undefined

  return (
    <Table
      sort={setSort}
      sortBy={sort.sortBy}
      sortDirection={sort.sortDirection}
      rowCount={dependencies.length}
      rowGetter={rowGetter}
      rowRenderer={rowRenderer}
    >
      <Column width={380} label="Library Name" dataKey="name" />

      <Column width={280} label="Up To Date Version" dataKey="version" disableSort />

      <Column
        width={280}
        label="Current version"
        dataKey="currentVersion"
        cellRenderer={renderVersion}
        disableSort
      />

      <Column width={150} label="License" dataKey="license" cellRenderer={renderLicense} />
    </Table>
  )
}

export default memo(NodeProjectDependenciesTable, (prev: IProps, next: IProps) =>
  prev.cacheKey ? prev.cacheKey === next.cacheKey : false
)
