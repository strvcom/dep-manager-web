import 'jest'

import { __get__ } from './helpers'

const setter = __get__('setter')
const merger = __get__('merger')
const getLibraries = __get__('getLibraries')
const getOutdated = __get__('getOutdated')
const getOutdates = __get__('getOutdates')
const buildLibrariesInfo = __get__('buildLibrariesInfo')
// const mergeLibrariesInfo = __get__('mergeLibrariesInfo')
// const getUniqueLibraries = __get__('getUniqueLibraries')
// const getRecentlyUpdated = __get__('getRecentlyUpdated')
// const extractLibrariesInfo = __get__('extractLibrariesInfo')

describe('routes/Dashboard/helpers', () => {
  describe('fn', () => {
    describe('setter', () => {
      it('should append key based on object mapper', () => {
        const obj = { a: 1 }
        const mapper = jest.fn(() => 2)

        expect(setter('b', mapper, obj)).toEqual({ a: 1, b: 2 })
        expect(mapper).toHaveBeenCalledWith(obj)
      })
    })

    describe('merger', () => {
      it('should merge two objects with non-conflicting keys', () => {
        const a = { a: 1 }
        const b = { b: 2 }

        const merge = merger({})

        expect(merge(a, b)).toEqual({ a: 1, b: 2 })
      })

      it('should merge two objects with conflicting keys but no mapper (merge-left)', () => {
        const a = { key: 1, a: 1 }
        const b = { key: 2, b: 2 }

        const merge = merger({})

        expect(merge(a, b)).toEqual({ key: 2, a: 1, b: 2 })
      })

      it('should use mapper to merge two objects with conflicting keys', () => {
        const a = { key: 1, a: 1 }
        const b = { key: 2, b: 2 }

        const merge = merger({
          key: (l: number, r: number) => l + r
        })

        expect(merge(a, b)).toEqual({ key: 3, a: 1, b: 2 })
      })
    })
  })

  describe('getLibraries', () => {
    const data = {
      nil: {},
      empty: { npmPackage: { dependencies: [] } },
      fulfiled: {
        npmPackage: {
          dependencies: [
            { package: { name: 'first' } },
            { package: { name: 'second' } }
          ]
        }
      }
    }

    it('should return empty array when no dependencies', () => {
      expect(getLibraries(data.nil)).toEqual([])
      expect(getLibraries(data.empty)).toEqual([])
    })

    it('should return dependency packages', () => {
      expect(getLibraries(data.fulfiled).length).toBe(2)
      expect(getLibraries(data.fulfiled)).toHaveProperty('0.name', 'first')
      expect(getLibraries(data.fulfiled)).toHaveProperty('1.name', 'second')
    })
  })

  describe('getOutdated', () => {
    const data = {
      nil: {},
      empty: { libraries: [] },
      noOutdated: { libraries: [{ outdated: null }] },
      outdates: {
        libraries: [
          { outdated: 'MINOR' },
          { outdated: 'MAJOR' },
          { outdated: null }
        ]
      }
    }

    it('should return empty array when no dependencies', () => {
      expect(getOutdated(data.nil)).toEqual([])
      expect(getOutdated(data.empty)).toEqual([])
      expect(getOutdated(data.noOutdated)).toEqual([])
    })

    it('should return outdated packages', () => {
      expect(getOutdated(data.outdates).length).toBe(2)
      expect(getOutdated(data.outdates)).toHaveProperty('0.outdated', 'MINOR')
      expect(getOutdated(data.outdates)).toHaveProperty('1.outdated', 'MAJOR')
    })
  })

  describe('getOutdates', () => {
    const data = {
      nil: {},
      empty: { libraries: [] },
      noOutdated: { libraries: [{ outdated: null }] },
      outdates: {
        libraries: [
          { outdated: 'MINOR' },
          { outdated: 'MAJOR' },
          { outdated: 'MINOR' },
          { outdated: 'PATCH' }
        ]
      }
    }

    it('should return empty array when no outdated packages', () => {
      expect(getOutdates(data.nil)).toEqual({})
      expect(getOutdates(data.empty)).toEqual({})
      expect(getOutdates(data.noOutdated)).toEqual({})
    })

    it('should return grouped outdated packages', () => {
      expect(getOutdates(data.outdates)).toHaveProperty('MINOR')
      expect(getOutdates(data.outdates)).toHaveProperty('MAJOR')
      expect(getOutdates(data.outdates)).toHaveProperty('PATCH')

      expect(getOutdates(data.outdates)).toHaveProperty('MINOR.length', 2)
      expect(getOutdates(data.outdates)).toHaveProperty('MAJOR.length', 1)
      expect(getOutdates(data.outdates)).toHaveProperty('PATCH.length', 1)
    })
  })

  describe('buildLibrariesInfo', () => {
    const packages = {
      uptodate: (ext: object) => ({ outdated: null, ...ext }),
      major: (ext: object) => ({ outdated: 'MAJOR', ...ext }),
      minor: (ext: object) => ({ outdated: 'MINOR', ...ext })
    }

    const data = {
      nil: { cursor: 'a', node: {} },
      empty: { cursor: 'b', node: { npmPackage: { dependencies: [] } } },
      noOutdated: {
        cursor: 'c',
        node: {
          npmPackage: {
            dependencies: [
              { package: packages.uptodate({ name: 'a' }) },
              { package: packages.uptodate({ name: 'b' }) }
            ]
          }
        }
      },
      outdates: {
        cursor: 'd',
        node: {
          npmPackage: {
            dependencies: [
              { package: packages.uptodate({ name: 'a' }) },
              { package: packages.major({ name: 'b' }) },
              { package: packages.minor({ name: 'c' }) },
              { package: packages.major({ name: 'd' }) }
            ]
          }
        }
      }
    }

    it('should return library info keys', () => {
      for (const sample in data) {
        const info = buildLibrariesInfo(data[sample])

        expect(Object.keys(info)).toEqual(['libraries', 'outdates'])
      }
    })

    it('should return empty libraries when no dependencies', () => {
      expect(buildLibrariesInfo(data.nil)).toHaveProperty('libraries', [])
      expect(buildLibrariesInfo(data.empty)).toHaveProperty('libraries', [])
    })

    it('should return empty outdates when outdates dependencies', () => {
      expect(buildLibrariesInfo(data.nil)).toHaveProperty('outdates', {})
      expect(buildLibrariesInfo(data.empty)).toHaveProperty('outdates', {})
      expect(buildLibrariesInfo(data.nil)).toHaveProperty('outdates', {})
    })

    it('should return dependency packages', () => {
      const noOutdated = buildLibrariesInfo(data.noOutdated)

      expect(noOutdated).toHaveProperty('libraries.length', 2)
      expect(noOutdated).toHaveProperty('libraries.0.name', 'a')
      expect(noOutdated).toHaveProperty('libraries.1.name', 'b')

      const outdates = buildLibrariesInfo(data.outdates)

      expect(outdates).toHaveProperty('libraries.length', 4)
      expect(outdates).toHaveProperty('libraries.0.name', 'a')
      expect(outdates).toHaveProperty('libraries.1.name', 'b')
      expect(outdates).toHaveProperty('libraries.2.name', 'c')
      expect(outdates).toHaveProperty('libraries.3.name', 'd')
    })

    it('should return grouped outdates', () => {
      const outdates = buildLibrariesInfo(data.outdates)

      expect(outdates).toHaveProperty('outdates.MAJOR')
      expect(outdates).toHaveProperty('outdates.MINOR')

      expect(outdates).toHaveProperty('outdates.MAJOR.length', 2)
      expect(outdates).toHaveProperty('outdates.MINOR.length', 1)
    })
  })
})
