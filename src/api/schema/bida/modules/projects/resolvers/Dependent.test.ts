import { __get__ } from './Dependent'

const getVersion = __get__('getVersion')

deepDescribe('api/bida/projects/resolvers', () => {
  beforeEach(jest.clearAllMocks)

  describe('getVersion', () => {
    it('should extract version from repository', () => {
      const repository = {
        name: 'name',
        npmPackage: {
          dependencies: [
            { package: { name: 'first' }, version: '1.0.0' },
            { package: { name: 'second' }, version: '2.0.0' }
          ]
        }
      }

      expect(getVersion('first', repository)).toBe('1.0.0')
      expect(getVersion('second', repository)).toBe('2.0.0')
    })
  })
})

declare var deepDescribe: any
