import { BidaDepartment } from '../config/types'
import toBidaDepartment from './toDepartment'

describe('utils/toDepartment', () => {
  const allows = (department: string): void =>
    it(`should allow ${department}`, () => {
      expect(toBidaDepartment(department)).toBe(department)
    })

  for (const department in BidaDepartment) {
    if (BidaDepartment.hasOwnProperty(department)) {
      allows(department)
    }
  }

  it('should parse known departments', () => {
    expect(toBidaDepartment('frontend')).toBe(BidaDepartment.FRONTEND)
  })

  it('should throw when invalid department', () => {
    expect(() => toBidaDepartment('invalid')).toThrow(/not a know department/u)
  })
})
