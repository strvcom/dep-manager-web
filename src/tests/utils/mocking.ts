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
  'UPTODATE'
]

const LICENSES = ['MIT', 'Apache', 'GPLv3', 'UNLICENSED']

chance.mixin({
  license: () => chance.pickone(LICENSES)
})

chance.mixin({
  outdateStatus: () => chance.pickone(OUTDATE_STATUS)
})

chance.mixin({
  dependency: () => {
    const version = chance.version()
    const currentVersion = chance.version({ max: version })

    return {
      id: chance.string(),
      package: { version, name: chance.word(), license: chance.license() },
      version: currentVersion,
      outdateStatus: versionDistance(version, currentVersion)
    }
  }
})

chance.mixin({
  project: () => ({
    name: chance.word(),
    pushedAt: chance.date().toString(),
    npmPackage: {
      dependencies: n(10, chance.dependency)
    }
  })
})

chance.mixin({
  package: (name: string) => ({
    name: name || chance.word(),
    license: chance.license()
  })
})

chance.mixin({
  library: (...args: any[]) => ({
    package: chance.package(...args)
  })
})

const versionDefaults = {
  constraint: {
    major: { min: 0, max: 5 },
    minor: { min: 0, max: 20 },
    patch: { min: 0, max: 20 }
  },
  max: null
}

chance.mixin({
  version: (options: any = {}) => {
    const { constraint, max } = mergeDeepRight(versionDefaults, options)

    const major = chance.integer(constraint.major)
    const minor = chance.integer(constraint.minor)
    const patch = chance.integer(constraint.patch)

    const version = `${major}.${minor}.${patch}`

    return max && semver.gt(version, max) ? max : version
  }
})

chance.mixin({
  dependent: ({ maxVersion }: any = {}) => ({
    node: {
      id: chance.string(),
      version: chance.version({ max: maxVersion }),
      repository: {
        name: chance.word()
      }
    }
  })
})

/**
 * Create an array of N using a callback FN.
 */
export const n = (amount: number, fn: any) =>
  new Array(amount).fill(null).map(() => fn())
