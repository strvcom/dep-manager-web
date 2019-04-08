import 'jest'

import { __get__ } from './helpers'

const setter = __get__('setter')
const getLibraries = __get__('getLibraries')
const getOutdated = __get__('getOutdated')

describe('routes/Dashboard/helpers', () => {
  describe('setter', () => {
    it('should append key based on object mapper', () => {
      const obj = { a: '1' }
      const mapper = jest.fn(() => '2')

      expect(setter('b', mapper, obj)).toEqual({ a: '1', b: '2' })
      expect(mapper).toHaveBeenCalledWith(obj)
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
})
