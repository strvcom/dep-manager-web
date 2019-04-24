import { versionDistance } from './version-diff'

describe('utils/version-diff', () => {
  describe('versionDistance', () => {
    it('should return UNKNOWN when some version missing', () => {
      expect(versionDistance(null, null)).toBe('UNKNOWN')
      expect(versionDistance('1.0.0', null)).toBe('UNKNOWN')
      expect(versionDistance(null, '1.0.0')).toBe('UNKNOWN')
    })

    it('should return UNKNOWN when some version is invalid', () => {
      expect(versionDistance('1.0.0', 'invalid')).toBe('UNKNOWN')
      expect(versionDistance('invalid', '1.0.0')).toBe('UNKNOWN')
    })

    it('should return majors', () => {
      expect(versionDistance('1.0.0', '2.0.0')).toBe('MAJOR')
      expect(versionDistance('2.0.0', '1.0.0')).toBe('MAJOR')
    })

    it('should return minors', () => {
      expect(versionDistance('1.0.0', '1.5.0')).toBe('MINOR')
      expect(versionDistance('1.5.0', '1.0.0')).toBe('MINOR')
      expect(versionDistance('1.5.5', '1.x.x')).toBe('MINOR')
    })

    it('should return patches', () => {
      expect(versionDistance('1.0.0', '1.0.5')).toBe('PATCH')
      expect(versionDistance('1.0.5', '1.0.0')).toBe('PATCH')
      expect(versionDistance('1.0.5', '1.0.x')).toBe('PATCH')
    })

    it('should return up-to-dates', () => {
      expect(versionDistance('1.0.0', '1.0.0')).toBe('UPTODATE')
      expect(versionDistance('1.0.0', '^1.0.0')).toBe('UPTODATE')
      expect(versionDistance('1.0.0', '1.0.x')).toBe('UPTODATE')
      expect(versionDistance('1.0.0', '1.x.x')).toBe('UPTODATE')
    })
  })
})
