import {
  T,
  __,
  append,
  concat,
  cond,
  curry,
  equals,
  filter,
  flip,
  map,
  memoizeWith,
  mergeAll,
  mergeRight,
  mergeWith,
  mergeWithKey,
  nthArg,
  objOf,
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
  uniqBy
} from 'ramda'

const infoShape = {
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
    UPTODATE: []
  },
  uniqueLibraries: [],
  recentlyUpdated: []
}

const setter = curry(
  (key: string, mapper: (obj: object) => any, obj: object) => ({
    ...obj,
    [key]: mapper(obj)
  })
)

const merger = (mergeMap: object) =>
  mergeWithKey(
    cond(
      // @ts-ignore
      Object.keys(mergeMap)
        .map(key => [
          equals(key),
          (k: string, l: any, r: any) => mergeMap[key](l, r)
        ])
        // default merge-left.
        .concat([[T, nthArg(2)]])
    )
  )

const getDependencies = pathOr([], ['npmPackage', 'dependencies'])

const getOutdates = pipe(
  propOr([], 'libraries'),
  // @ts-ignore
  reduceBy(
    flip(append),
    // @ts-ignore
    [],
    prop('outdateStatus')
  ),
  map(map(prop('package')))
)

// this operation can be expensive... memoization for the rescue.
const buildLibrariesInfo = memoizeWith(
  prop('cursor'),
  pipe(
    // @ts-ignore
    prop('node'),
    // @ts-ignore
    setter('libraries', getDependencies),
    setter('outdates', getOutdates),
    pick(['libraries', 'outdates'])
  )
)

const mergeLibrariesInfo = pipe(
  merger({
    libraries: concat,
    outdates: mergeWith(concat)
  }),
  mergeRight({ libraries: [], outdates: {} })
)

// @ts-ignore
const getUniqueDependencies = uniqBy(path(['package', 'name']))

export const getRecentlyUpdated = pipe(
  // @ts-ignore
  sortBy(path(['package', 'updatedAt'])),
  // @ts-ignore
  reverse,
  // @ts-ignore
  take(10)
)

const calcUniqueLibraries = setter(
  'uniqueLibraries',
  pipe(
    propOr([], 'libraries'),
    // @ts-ignore
    getUniqueDependencies
  )
)

const calcRecentlyUpdated = setter(
  'recentlyUpdated',
  pipe(
    propOr([], 'uniqueLibraries'),
    getRecentlyUpdated,
    map(prop('package'))
  )
)

const extractLibrariesInfo = pipe(
  // @ts-ignore
  propOr([], 'edges'),
  // @ts-ignore
  map(buildLibrariesInfo),
  // @ts-ignore
  reduce(mergeLibrariesInfo, infoShape),

  // @ts-ignore
  calcUniqueLibraries,
  calcRecentlyUpdated
)

export { extractLibrariesInfo }
