import semver from 'semver'
import Chance from 'chance'
import { mergeDeepRight } from 'ramda'
import { versionDistance } from '../../utils/version-diff'

export const chance = new Chance()

const OUTDATE_STATUS = [
  'MAJOR',
  'PREMAJOR',
  'MINOR',
  'PREMINOR',
  'PATCH',
  'PREPATCH',
  'PRERELEASE',
  'UNKNOWN',
  'UPTODATE',
]

const LICENSES = ['MIT', 'Apache', 'GPLv3', 'UNLICENSED']

/**
 * Create an array of N using a callback FN.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const n = (amount: number, fn: () => any): any[] =>
  new Array(amount).fill(null).map(() => fn())

chance.mixin({
  license: () => chance.pickone(LICENSES),
})

chance.mixin({
  outdateStatus: () => chance.pickone(OUTDATE_STATUS),
})

chance.mixin({
  dependency: () => {
    const version = chance.version()
    const currentVersion = chance.version({ max: version })

    return {
      id: chance.string(),
      package: { version, name: chance.word(), license: chance.license() },
      version: currentVersion,
      outdateStatus: versionDistance(version, currentVersion),
    }
  },
})

chance.mixin({
  project: () => ({
    name: chance.word(),
    pushedAt: chance.date().toString(),
    npmPackage: {
      dependencies: n(10, chance.dependency),
    },
  }),
})

chance.mixin({
  package: (name: string) => ({
    name: name || chance.word(),
    license: chance.license(),
  }),
})

chance.mixin({
  library: (name: string) => ({
    package: chance.package(name),
  }),
})

interface IVersionOptions {
  constraint?: {
    [diff: string]: { min: number, max: number }
  }
  max?: string
}

const versionDefaults: IVersionOptions = {
  constraint: {
    major: { min: 0, max: 5 },
    minor: { min: 0, max: 20 },
    patch: { min: 0, max: 20 },
  },
  max: undefined,
}

chance.mixin({
  version: (options: IVersionOptions = {}) => {
    const { constraint, max } = mergeDeepRight(versionDefaults, options)

    const major = chance.integer(constraint.major)
    const minor = chance.integer(constraint.minor)
    const patch = chance.integer(constraint.patch)

    const version = `${major}.${minor}.${patch}`

    return max && semver.gt(version, max) ? max : version
  },
})

chance.mixin({
  dependent: ({ maxVersion }: { maxVersion?: string } = {}) => ({
    node: {
      id: chance.string(),
      version: chance.version({ max: maxVersion }),
      repository: {
        name: chance.word(),
      },
    },
  }),
})
