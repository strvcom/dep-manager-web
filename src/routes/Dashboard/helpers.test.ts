import 'jest'
import uuid from 'uuid/v4'

import {
  extractLibrariesInfo,
  getRecentlyUpdated,
  setter,
  merger,
  getDependencies,
  getOutdates,
  buildLibrariesInfo,
  mergeLibrariesInfo,
  getUniqueDependencies,
  infoShape,
} from './helpers'

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
          key: (l: number, r: number) => l + r,
        })

        expect(merge(a, b)).toEqual({ key: 3, a: 1, b: 2 })
      })
    })
  })

  describe('getDependencies', () => {
    const data = {
      nil: {},
      empty: { npmPackage: { dependencies: [] } },
      fulfiled: {
        npmPackage: {
          dependencies: [{ package: { name: 'first' } }, { package: { name: 'second' } }],
        },
      },
    }

    it('should return empty array when no dependencies', () => {
      expect(getDependencies(data.nil)).toEqual([])
      expect(getDependencies(data.empty)).toEqual([])
    })

    it('should return dependency packages', () => {
      expect(getDependencies(data.fulfiled).length).toBe(2)
      expect(getDependencies(data.fulfiled)).toHaveProperty('0.package.name', 'first')
      expect(getDependencies(data.fulfiled)).toHaveProperty('1.package.name', 'second')
    })
  })

  describe('getOutdates', () => {
    const data = {
      nil: {},
      empty: { libraries: [] },
      uptodate: { libraries: [{ outdateStatus: 'UPTODATE' }] },
      outdates: {
        libraries: [
          { outdateStatus: 'MINOR' },
          { outdateStatus: 'MAJOR' },
          { outdateStatus: 'MINOR' },
          { outdateStatus: 'PATCH' },
        ],
      },
    }

    it('should return empty array when no outdate status found', () => {
      expect(getOutdates(data.nil)).toEqual({})
      expect(getOutdates(data.empty)).toEqual({})
    })

    it('should return grouped packages by outdate status', () => {
      expect(getOutdates(data.outdates)).toHaveProperty('MINOR')
      expect(getOutdates(data.outdates)).toHaveProperty('MAJOR')
      expect(getOutdates(data.outdates)).toHaveProperty('PATCH')

      expect(getOutdates(data.outdates)).toHaveProperty('MINOR.length', 2)
      expect(getOutdates(data.outdates)).toHaveProperty('MAJOR.length', 1)
      expect(getOutdates(data.outdates)).toHaveProperty('PATCH.length', 1)
    })
  })

  describe('buildLibrariesInfo', () => {
    const data = {
      nil: { cursor: uuid(), node: {} },
      empty: { cursor: uuid(), node: { npmPackage: { dependencies: [] } } },
      uptodate: {
        cursor: uuid(),
        node: {
          npmPackage: {
            dependencies: [
              { package: { name: 'a' }, outdateStatus: 'UPTODATE' },
              { package: { name: 'b' }, outdateStatus: 'UPTODATE' },
            ],
          },
        },
      },
      outdates: {
        cursor: uuid(),
        node: {
          npmPackage: {
            dependencies: [
              { package: { name: 'a' }, outdateStatus: 'UPTODATE' },
              { package: { name: 'b' }, outdateStatus: 'MAJOR' },
              { package: { name: 'c' }, outdateStatus: 'MINOR' },
              { package: { name: 'd' }, outdateStatus: 'MAJOR' },
            ],
          },
        },
      },
    }

    it('should return library info keys', () => {
      for (const sample in data) {
        if (data.hasOwnProperty(sample)) {
          const info = buildLibrariesInfo(data[sample])

          expect(Object.keys(info)).toEqual(['libraries', 'outdates'])
        }
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
      const uptodate = buildLibrariesInfo(data.uptodate)

      expect(uptodate).toHaveProperty('libraries.length', 2)
      expect(uptodate).toHaveProperty('libraries.0.package.name', 'a')
      expect(uptodate).toHaveProperty('libraries.1.package.name', 'b')

      const outdates = buildLibrariesInfo(data.outdates)

      expect(outdates).toHaveProperty('libraries.length', 4)
      expect(outdates).toHaveProperty('libraries.0.package.name', 'a')
      expect(outdates).toHaveProperty('libraries.1.package.name', 'b')
      expect(outdates).toHaveProperty('libraries.2.package.name', 'c')
      expect(outdates).toHaveProperty('libraries.3.package.name', 'd')
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
        outdates: { MAJOR: [{ name: 'b' }], MINOR: [{ name: 'c' }] },
      }

      const result = {
        libraries: [],
        outdates: {
          MAJOR: [{ name: 'a' }, { name: 'b' }],
          MINOR: [{ name: 'c' }],
        },
      }

      expect(mergeLibrariesInfo(left, right)).toEqual(result)
    })
  })

  describe('getUniqueDependencies', () => {
    it('should return empty arrays when no libraries', () => {
      expect(getUniqueDependencies([])).toEqual([])
    })

    it('should return unique libraries', () => {
      const unique = [{ package: { name: 'a' } }, { package: { name: 'b' } }]

      const repeated = [
        { package: { name: 'a' } },
        { package: { name: 'b' } },
        { package: { name: 'a' } },
      ]

      expect(getUniqueDependencies(unique)).toEqual(unique)
      expect(getUniqueDependencies(repeated)).toEqual(unique)
    })
  })

  describe('getRecentlyUpdated', () => {
    it('should return empty arrays when no libraries', () => {
      expect(getRecentlyUpdated({})).toEqual([])
      expect(getRecentlyUpdated({ uniqueLibraries: [] })).toEqual([])
    })

    it('should return max 10 libraries', () => {
      const data = Array(20).fill({})
      expect(getRecentlyUpdated(data)).toHaveProperty('length', 10)
    })

    it('should return less than 10 libraries when having less', () => {
      const data = Array(5).fill({})
      expect(getRecentlyUpdated(data)).toHaveProperty('length', 5)
    })

    it('should sort results', () => {
      const libs = [
        { package: { updatedAt: '2007' } },
        { package: { updatedAt: '2010' } },
        { package: { updatedAt: '2011' } },
        { package: { updatedAt: '2008' } },
      ]

      expect(libs).toHaveProperty('0.package.updatedAt', '2007')
      expect(libs).toHaveProperty('1.package.updatedAt', '2010')
      expect(libs).toHaveProperty('2.package.updatedAt', '2011')
      expect(libs).toHaveProperty('3.package.updatedAt', '2008')

      const res = getRecentlyUpdated(libs)

      expect(res).toHaveProperty('0.package.updatedAt', '2011')
      expect(res).toHaveProperty('1.package.updatedAt', '2010')
      expect(res).toHaveProperty('2.package.updatedAt', '2008')
      expect(res).toHaveProperty('3.package.updatedAt', '2007')
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
            node: {
              npmPackage: { dependencies: [{ package: { name: 'a' } }] },
            },
          },
          {
            cursor: uuid(),
            node: {
              npmPackage: { dependencies: [{ package: { name: 'b' } }] },
            },
          },
        ],
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('libraries.0.package.name', 'a')
      expect(info).toHaveProperty('libraries.1.package.name', 'b')
    })

    it('should extract outdate status libraries from all edges', () => {
      const data = {
        edges: [
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [{ package: { name: 'a' }, outdateStatus: 'MAJOR' }],
              },
            },
          },
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [{ package: { name: 'a' }, outdateStatus: 'MINOR' }],
              },
            },
          },
        ],
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('outdates.MAJOR.0.name', 'a')
      expect(info).toHaveProperty('outdates.MINOR.0.name', 'a')
    })

    it('should extract unique libraries from all edges', () => {
      const data = {
        edges: [
          {
            cursor: uuid(),
            node: {
              npmPackage: { dependencies: [{ package: { name: 'a' } }] },
            },
          },
          {
            cursor: uuid(),
            node: {
              npmPackage: { dependencies: [{ package: { name: 'a' } }] },
            },
          },
        ],
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('libraries.0.package.name', 'a')
      expect(info).toHaveProperty('libraries.1.package.name', 'a')

      expect(info).toHaveProperty('uniqueLibraries.0.package.name', 'a')
      expect(info).not.toHaveProperty('uniqueLibraries.1.package.name', 'a')
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
                      analysis: { collected: { metadata: { date: '2010' } } },
                    },
                  },
                ],
              },
            },
          },
          {
            cursor: uuid(),
            node: {
              npmPackage: {
                dependencies: [
                  {
                    package: {
                      name: 'b',
                      analysis: { collected: { metadata: { date: '2020' } } },
                    },
                  },
                ],
              },
            },
          },
        ],
      }

      const info = extractLibrariesInfo(data)

      expect(info).toHaveProperty('recentlyUpdated.0.name', 'b')
      expect(info).toHaveProperty('recentlyUpdated.1.name', 'a')
    })
  })
})
