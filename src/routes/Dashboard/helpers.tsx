import {
  always,
  assoc,
  concat,
  converge,
  curry,
  equals,
  filter,
  identity,
  join,
  map,
  memoizeWith,
  mergeWith,
  path,
  pathOr,
  pick,
  pipe,
  prop,
  reduce,
  reverse,
  sortBy,
  take,
  uniqBy
} from 'ramda'

import versionDiff from '../../utils/version-diff'

const isOutdated = pipe(
  converge(versionDiff, [
    prop('version'),
    path(['analysis', 'collected', 'metadata', 'version'])
  ]),
  equals('major')
)

const setter = curry((key, mapper) =>
  // @ts-ignore
  converge(assoc, [always(key), mapper, identity])
)

const getLibraries = pipe(
  pathOr([], ['npmPackage', 'dependencies']),
  map(prop('package'))
)

const getOutdated = pipe(
  // @ts-ignore
  prop('libraries'),
  // @ts-ignore
  filter(isOutdated)
)

const getRecentlyUpdated = pipe(
  // @ts-ignore
  prop('libraries'),
  // @ts-ignore
  sortBy(path(['analysis', 'collected', 'metadata', 'date'])),
  // @ts-ignore
  reverse,
  // @ts-ignore
  take(10)
)

const processLibrariesInfo = memoizeWith(
  // memoization cache key.
  prop('id'),
  // fn.
  pipe(
    setter('libraries', getLibraries),
    setter('outdated', getOutdated),
    setter('updated', getRecentlyUpdated),
    pick(['libraries', 'outdated', 'updated'])
  )
)

const mergeLibraries = pipe(
  concat,
  // @ts-ignore
  uniqBy(prop('id'))
)

// this calculation can be expensive... thus why we memoize it.
const extractLibrariesInfo = memoizeWith(
  pipe(
    prop('edges'),
    // @ts-ignore
    map(prop('cursor')),
    // @ts-ignore
    join('')
  ),
  pipe(
    // @ts-ignore
    prop('edges'),
    // @ts-ignore
    map(
      pipe(
        // @ts-ignore
        prop('node'),
        processLibrariesInfo
      )
    ),

    reduce(mergeWith(mergeLibraries), {})
  )
)

export { extractLibrariesInfo }
