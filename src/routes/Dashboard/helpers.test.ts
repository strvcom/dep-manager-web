import 'jest'

import { __get__ } from './helpers'

const setter = __get__('setter')
const getLibraries = __get__('getLibraries')
const getLibraries = __get__('getLibraries')

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
})
