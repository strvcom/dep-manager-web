import {
  converge,
  equals,
  map,
  path,
  pathOr,
  pipe,
  prop,
  reverse,
  sortBy,
  take,
  uniqBy
} from 'ramda'

import versionDiff from '../../utils/version-diff'

const getDependencies = pipe(
  pathOr([], ['npmPackage', 'dependencies']),
  map(prop('package'))
)

const getAllDependencies = pipe(
  // @ts-ignore
  map(getDependencies),
  // @ts-ignore
  libraries => [].concat(...libraries),
  // @ts-ignore
  uniqBy(prop('id'))
)

const isOutdated = pipe(
  converge(versionDiff, [
    prop('version'),
    path(['analysis', 'collected', 'metadata', 'version'])
  ]),
  equals('major')
)

const getRecentlyUpdated = pipe(
  // @ts-ignore
  sortBy(path(['analysis', 'collected', 'metadata', 'date'])),
  // @ts-ignore
  reverse,
  // @ts-ignore
  take(10)
)

export { getAllDependencies, isOutdated, getRecentlyUpdated }
