import { License } from '../config/types'
import { isValidLicense } from './license'

const licenses = Object.keys(License)

deepDescribe('utils/isValidLicense', () => {
  const valids = (license: string): void =>
    it(`should allow ${license}`, () => {
      expect(isValidLicense(license)).toBe(true)
    })

  for (const license of licenses) {
    valids(license)
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
