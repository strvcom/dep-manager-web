import { BidaDepartment } from '../config/types'
import toBidaDepartment from './toDepartment'

describe('utils/toDepartment', () => {
  for (const department in BidaDepartment) {
    it(`should allow ${department}`, () => {
      expect(toBidaDepartment(department)).toBe(department)
    })
  }

  it('should parse known departments', () => {
    expect(toBidaDepartment('frontend')).toBe(BidaDepartment.FRONTEND)
  })

  it('should throw when invalid department', () => {
    expect(() => toBidaDepartment('invalid')).toThrow(/not a know department/)
  })
})
