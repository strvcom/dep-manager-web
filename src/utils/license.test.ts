import { License } from '../config/types'
import { isValidLicense } from './license'

const licenses = Object.keys(License)

deepDescribe('utils/isValidLicense', () => {
  for (const license of licenses) {
    it(`should allow ${license}`, () => {
      expect(isValidLicense(license)).toBe(true)
    })
  }

  it('should deny otherwise', () => {
    expect(isValidLicense('invalid')).toBe(false)
    expect(isValidLicense('')).toBe(false)
  })

  it('should allow similars', () => {
    expect(isValidLicense('~Apache~')).toBe(true)
    expect(isValidLicense('mit')).toBe(true)
  })
})
