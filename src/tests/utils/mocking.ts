import Chance from 'chance'

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

chance.mixin({
  dependency: () => ({
    outdateStatus: chance.pickone(OUTDATE_STATUS)
  })
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
    license: chance.pickone(['MIT', 'Apache', 'GPLv3', 'UNLICENSED'])
  })
})

chance.mixin({
  library: (...args: any[]) => ({
    package: chance.package(...args)
  })
})

/**
 * Create an array of N using a callback FN.
 */
export const n = (amount: number, fn: any) =>
  new Array(amount).fill(null).map(() => fn())
