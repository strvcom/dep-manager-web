import { is } from './type-utils'

describe('utils/type-utils', () => {
  describe('is', () => {
    enum Mapped {
      First = 'FIRST',
      Second = 'SECOND',
    }

    // enum Numbered {
    //   FIRST,
    //   SECOND,
    // }

    it('should predicate enum values', () => {
      expect(is(Mapped)('FIRST')).toBe(true)
      expect(is(Mapped)('SECOND')).toBe(true)
      expect(is(Mapped)('OTHER')).toBe(false)

      // expect(is(Numbered)('FIRST')).toBe(true)
      // expect(is(Numbered)('SECOND')).toBe(true)
      // expect(is(Numbered)('OTHER')).toBe(false)
    })
  })
})
