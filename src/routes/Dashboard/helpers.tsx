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
    UPTODATE: [],
  },
  uniqueLibraries: [],
  recentlyUpdated: [],
}

const setter = curry(
  (key: string, mapper: (obj: object) => object, obj: object) => ({
    ...obj,
    [key]: mapper(obj),
  })
)

const merger = (mergeMap: object): Function =>
  mergeWithKey(
    cond(
      // @ts-ignore
      Object.keys(mergeMap)
        .map(key => [
          equals(key),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (k: string, l: any, r: any) => mergeMap[key](l, r),
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
    // @ts-ignore
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
    outdates: mergeWith(concat),
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
  // @ts-ignore
  'recentlyUpdated',
  pipe(
    propOr([], 'uniqueLibraries'),
    getRecentlyUpdated,
    // @ts-ignore
    map(prop('package'))
  )
)

// @ts-ignore
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
