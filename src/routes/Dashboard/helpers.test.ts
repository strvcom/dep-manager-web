import 'jest'
import uuid from 'uuid/v4'

import { extractLibrariesInfo, __get__ } from './helpers'

const setter = __get__('setter')
const merger = __get__('merger')
const getLibraries = __get__('getLibraries')
const getOutdated = __get__('getOutdated')
const getOutdates = __get__('getOutdates')
const buildLibrariesInfo = __get__('buildLibrariesInfo')
const mergeLibrariesInfo = __get__('mergeLibrariesInfo')
const getUniqueLibraries = __get__('getUniqueLibraries')
const getRecentlyUpdated = __get__('getRecentlyUpdated')
const infoShape = __get__('infoShape')

const copy = (obj: any) => JSON.parse(JSON.stringify(obj))

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

      it('should merge two objects with conflicting keys but no mapper (merge-right)', () => {
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
      nil: { cursor: uuid(), node: {} },
      empty: { cursor: uuid(), node: { npmPackage: { dependencies: [] } } },
      noOutdated: {
        cursor: uuid(),
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
        cursor: uuid(),
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

  describe('mergeLibrariesInfo', () => {
    it('should merge empty infos (default shape)', () => {
      const nil = {}
      const empty = { libraries: [], outdates: {} }

      expect(mergeLibrariesInfo(nil, nil)).toEqual(empty)
      expect(mergeLibrariesInfo(empty, empty)).toEqual(empty)
    })

    it('should combine libraries list', () => {
      const left = { libraries: [{ name: 'a' }] }
      const right = { libraries: [{ name: 'b' }] }
      const result = { libraries: [{ name: 'a' }, { name: 'b' }], outdates: {} }

      expect(mergeLibrariesInfo(left, right)).toEqual(result)
    })

    it('should combine outdates', () => {
      const left = { outdates: { MAJOR: [{ name: 'a' }] } }
      const right = {
        outdates: { MAJOR: [{ name: 'b' }], MINOR: [{ name: 'c' }] }
      }

      const result = {
        libraries: [],
        outdates: {
          MAJOR: [{ name: 'a' }, { name: 'b' }],
          MINOR: [{ name: 'c' }]
        }
      }

      expect(mergeLibrariesInfo(left, right)).toEqual(result)
    })
  })

  describe('getUniqueLibraries', () => {
    it('should return empty arrays when no libraries', () => {
      expect(getUniqueLibraries({})).toEqual([])
      expect(getUniqueLibraries({ libraries: [] })).toEqual([])
    })

    it('should return unique libraries', () => {
      const unequal = { libraries: [{ name: 'a' }, { name: 'b' }] }
      const equal = { libraries: [{ name: 'a' }, { name: 'b' }, { name: 'a' }] }

      expect(getUniqueLibraries(unequal)).toEqual(unequal.libraries)
      expect(getUniqueLibraries(equal)).toEqual(unequal.libraries)
    })
  })

  describe('getRecentlyUpdated', () => {
    it('should return empty arrays when no libraries', () => {
      expect(getRecentlyUpdated({})).toEqual([])
      expect(getRecentlyUpdated({ uniqueLibraries: [] })).toEqual([])
    })

    it('should return max 10 libraries', () => {
      const data = { uniqueLibraries: Array(20).fill({}) }
      expect(getRecentlyUpdated(data)).toHaveProperty('length', 10)
    })

    it('should return less than 10 libraries when having less', () => {
      const data = { uniqueLibraries: Array(5).fill({}) }
      expect(getRecentlyUpdated(data)).toHaveProperty('length', 5)
    })

    it('should sort results', () => {
      const initial = { analysis: { collected: { metadata: {} } } }

      const lib = Array(3)
        .fill(initial)
        .map(copy)

      const dates = { 0: '2010', 1: '2011', 2: '2008' }

      for (const i in dates) {
        lib[i].analysis.collected.metadata.date = dates[i]
      }

      expect(lib).toHaveProperty('0.analysis.collected.metadata.date', '2010')
      expect(lib).toHaveProperty('1.analysis.collected.metadata.date', '2011')
      expect(lib).toHaveProperty('2.analysis.collected.metadata.date', '2008')

      const res = getRecentlyUpdated({ uniqueLibraries: lib })

      expect(res).toHaveProperty('0.analysis.collected.metadata.date', '2011')
      expect(res).toHaveProperty('1.analysis.collected.metadata.date', '2010')
      expect(res).toHaveProperty('2.analysis.collected.metadata.date', '2008')
    })
  })

  describe('extractLibrariesInfo', () => {
    it('should ensure shape', () => {
      const info = extractLibrariesInfo(null)

      expect(info).toHaveProperty('libraries', infoShape.libraries)
      expect(info).toHaveProperty('outdates', infoShape.outdates)
      expect(info).toHaveProperty('uniqueLibraries', infoShape.uniqueLibraries)
      expect(info).toHaveProperty('recentlyUpdated', infoShape.recentlyUpdated)
    })

    it('should extract libraries from all edges', () => {
      const data = {
        edges: [
          {
            cursor: uuid(),
            node: { npmPackage: { dependencies: [{ package: { name: 'a' } }] } }
          },
          {
            cursor: uuid(),
            node: { npmPackage: { dependencies: [{ package: { name: 'b' } }] } }
          }
        ]
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('libraries.0.name', 'a')
      expect(info).toHaveProperty('libraries.1.name', 'b')
    })

    it('should extract outdated libraries from all edges', () => {
      const data = {
        edges: [
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [{ package: { name: 'a', outdated: 'MAJOR' } }]
              }
            }
          },
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [{ package: { name: 'a', outdated: 'MINOR' } }]
              }
            }
          }
        ]
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('outdates.MAJOR.0.name', 'a')
      expect(info).toHaveProperty('outdates.MAJOR.0.outdated', 'MAJOR')

      expect(info).toHaveProperty('outdates.MINOR.0.name', 'a')
      expect(info).toHaveProperty('outdates.MINOR.0.outdated', 'MINOR')
    })

    it('should extract unique libraries from all edges', () => {
      const data = {
        edges: [
          {
            cursor: uuid(),
            node: { npmPackage: { dependencies: [{ package: { name: 'a' } }] } }
          },
          {
            cursor: uuid(),
            node: { npmPackage: { dependencies: [{ package: { name: 'a' } }] } }
          }
        ]
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('libraries.0.name', 'a')
      expect(info).toHaveProperty('libraries.1.name', 'a')

      expect(info).toHaveProperty('uniqueLibraries.0.name', 'a')
      expect(info).not.toHaveProperty('uniqueLibraries.1.name', 'a')
    })

    it('should extract recently updated libraries from all edges', () => {
      const data = {
        edges: [
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [
                  {
                    package: {
                      name: 'a',
                      analysis: { collected: { metadata: { date: '2010' } } }
                    }
                  }
                ]
              }
            }
          },
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [
                  {
                    package: {
                      name: 'b',
                      analysis: { collected: { metadata: { date: '2020' } } }
                    }
                  }
                ]
              }
            }
          }
        ]
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('recentlyUpdated.0.name', 'b')
      expect(info).toHaveProperty('recentlyUpdated.1.name', 'a')
    })
  })
})
