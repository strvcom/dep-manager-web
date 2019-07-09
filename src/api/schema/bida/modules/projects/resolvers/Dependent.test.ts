import { Dependent, getVersion } from './Dependent'

const { version, name, id, outdateStatus } = Dependent

deepDescribe('api/bida/projects/resolvers', () => {
  beforeEach(jest.clearAllMocks)

  const repository = {
    name: 'repo',
    npmPackage: {
      dependencies: [
        { package: { name: 'first' }, version: '1.0.0' },
        { package: { name: 'second' }, version: '2.0.0' },
      ],
    },
  }

  const __parent = { name: 'first', version: '0.9.0' }

  describe('getVersion', () => {
    it('should extract version from repository', () => {
      expect(getVersion('first', repository)).toBe('1.0.0')
      expect(getVersion('second', repository)).toBe('2.0.0')
    })
  })

  describe('Dependent::version', () => {
    it('should resolve version', () => {
      expect(version({ __parent, repository })).toBe('1.0.0')
    })
  })

  describe('Dependent::name', () => {
    it('should resolve name', () => {
      expect(name({ repository })).toBe('repo')
    })
  })

  describe('Dependent::id', () => {
    it('should resolve id', () => {
      expect(id({ __parent, repository })).toBe('1.0.0@repo')
    })
  })

  describe('Dependent::outdateStatus', () => {
    it('should resolve outdateStatus', () => {
      expect(outdateStatus({ __parent, repository })).toBe('MAJOR')
    })
  })
})
