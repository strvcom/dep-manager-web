import {
  T,
  append,
  concat,
  cond,
  curry,
  equals,
  flip,
  map,
  memoizeWith,
  mergeRight,
  mergeWith,
  mergeWithKey,
  nthArg,
  path,
  pathOr,
  pick,
  pipe,
  prop,
  propOr,
  reduce,
  reduceBy,
  reverse,
  sortBy,
  take,
  uniqBy,
  filter,
  includes,
  defaultTo,
} from 'ramda'

import {
  DASHBOARD_QUERY_projects_edges_node_Repository as Repository,
  DASHBOARD_QUERY_projects_edges as Projects,
  DASHBOARD_QUERY_projects_edges_node as ProjectsNode,
  DASHBOARD_QUERY_projects_edges_node as Project,
  DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies as NPMDependency,
  DASHBOARD_QUERY_projects_edges_node_Repository_npmPackage_dependencies_package as NPMPackage,
} from './graphql-types/DASHBOARD_QUERY'
import { SemverOutdateStatus } from '../../generated/graphql-types'
import propEq from 'ramda/es/propEq'

interface Info {
  libraries: NPMDependency[]
  outdates: Record<SemverOutdateStatus, NPMPackage[]>
  uniqueLibraries: NPMDependency[]
  recentlyUpdated: NPMPackage[]
}

const infoShape: Info = {
  libraries: [],
  outdates: {
    MAJOR: [],
    PREMAJOR: [],
    MINOR: [],
    PREMINOR: [],
    PATCH: [],
    PREPATCH: [],
    PRERELEASE: [],
    UNKNOWN: [],
    UPTODATE: [],
  },
  uniqueLibraries: [],
  recentlyUpdated: [],
}

const setter = curry((key: string, mapper: (obj: any) => unknown, obj) => ({
  ...obj,
  [key]: mapper(obj),
}))

const merger = (mergeMap: Record<string, <L, R>(l: L, r: R) => unknown>) =>
  mergeWithKey(
    cond([
      ...Object.keys(mergeMap).map(
        key =>
          [equals(key), (k: string, l: unknown, r: unknown) => mergeMap[key](l, r)] as [
            ReturnType<typeof equals>,
            ReturnType<typeof nthArg>
          ]
      ),
      [T, nthArg(2)],
    ])
  ) as <L, R>(l: L, r: R) => L & R

const getDependencies = pipe<Project, Array<NPMDependency | null>, NPMDependency[]>(
  pathOr([], ['npmPackage', 'dependencies']),
  filter(Boolean) as (array: Array<NPMDependency | null>) => Array<NPMDependency>
)

const getOutdates = pipe<
  Info,
  NPMDependency[],
  Record<string, NPMDependency[]>,
  Record<string, NPMPackage[]>
>(
  propOr([], 'libraries'),
  reduceBy<NPMDependency, NPMDependency[]>(
    flip<NPMDependency, NPMDependency[], NPMDependency[]>(append),
    [],
    propOr(SemverOutdateStatus.UNKNOWN, 'outdateStatus')
  ),
  (map(map(prop('package'))) as unknown) as (
    rec: Record<string, NPMDependency[]>
  ) => Record<string, NPMPackage[]>
)

// this operation can be expensive... memoization for the rescue.
const buildLibrariesInfo = memoizeWith(
  prop('cursor'),
  pipe<Projects, Project, Info, Info, Pick<Info, 'libraries' | 'outdates'>>(
    prop('node'),
    setter('libraries', getDependencies),
    setter('outdates', getOutdates),
    pick(['libraries', 'outdates'])
  )
)

const mergeLibrariesInfo = pipe(
  merger({
    libraries: concat,
    outdates: mergeWith(concat),
  }),
  mergeRight({ libraries: [], outdates: {} })
)

const getUniqueDependencies = uniqBy(path(['package', 'name']))

export const getRecentlyUpdated = pipe<
  NPMDependency[],
  NPMDependency[],
  NPMDependency[],
  NPMDependency[]
>(
  sortBy(pathOr(Number.POSITIVE_INFINITY, ['package', 'updatedAt'])),
  reverse,
  take(10)
)

const calcUniqueLibraries: (info: Info) => Info = setter(
  'uniqueLibraries',
  pipe(
    propOr([], 'libraries'),
    getUniqueDependencies
  )
)

const calcRecentlyUpdated: (info: Info) => Info = setter(
  'recentlyUpdated',
  pipe(
    propOr([], 'uniqueLibraries'),
    getRecentlyUpdated,
    map(prop('package'))
  )
)

const extractLibrariesInfo = pipe<
  Projects[],
  Projects[],
  Array<Pick<Info, 'libraries' | 'outdates'>>,
  Info,
  Info,
  Info
>(
  defaultTo([]),
  map(buildLibrariesInfo),
  reduce(mergeLibrariesInfo, infoShape),
  calcUniqueLibraries,
  calcRecentlyUpdated
)

const filterProjectsBySearch = (search: string) =>
  pipe<Projects[], ProjectsNode[], Repository[], Repository[]>(
    map(prop('node')),
    filter(propEq('__typename', 'Repository')),
    filter(
      pipe<Repository, string, boolean>(
        prop('name'),
        includes(search)
      )
    )
  )

// @tests
export {
  setter,
  merger,
  getDependencies,
  getOutdates,
  buildLibrariesInfo,
  mergeLibrariesInfo,
  getUniqueDependencies,
  infoShape,
}

export { extractLibrariesInfo, filterProjectsBySearch }
