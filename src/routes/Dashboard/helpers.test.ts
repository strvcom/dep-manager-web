import 'jest'

import { __get__ } from './helpers'

const setter = __get__('setter')

describe('routes/Dashboard/helpers', () => {
  describe('setter', () => {
    it('should append key based on object mapper', () => {
      const obj = { a: '1' }
      const mapper = jest.fn(() => '2')

      expect(setter('b', mapper, obj)).toEqual({ a: '1', b: '2' })
      expect(mapper).toHaveBeenCalledWith(obj)
    })
  })
})
