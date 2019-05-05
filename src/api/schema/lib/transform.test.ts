import { getTypeName } from './transform'

describe('api/lib/transform', () => {
  describe('getTypeName', () => {
    it('should resolve', () => {
      expect(getTypeName('Type')).toBe('Type')
      expect(getTypeName('Type!')).toBe('Type')
      expect(getTypeName('[Type]')).toBe('Type')
      expect(getTypeName('[Type]!')).toBe('Type')
      expect(getTypeName('[Type!]')).toBe('Type')
      expect(getTypeName('[Type!]!')).toBe('Type')
    })
  })
})
