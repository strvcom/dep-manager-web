import { NPMPackage, __get__, __set__ } from './NPMPackage'

const load = jest.fn()
const attachAnalysis = __get__('attachAnalysis')
const metadata = __get__('metadata')

__set__('loaders', { analysis: { load } })

deepDescribe('api/bida/npm/resolvers/NPMPackage', () => {
  beforeEach(jest.clearAllMocks)

  describe('attachAnalysis', () => {
    it('should attach "analysis" field', async () => {
      const pack = { name: 'name' }
      const analysis = { result: 'value' }

      load.mockReturnValueOnce(analysis)

      await expect(attachAnalysis(pack)).resolves.toEqual({ ...pack, analysis })
    })
  })

  describe('metadata', () => {
    const getAnalysis = (metadata: any = {}) => ({ collected: { metadata } })

    it('should create a new metadata field resolver', () => {
      const resolver = metadata('field')

      expect(resolver).toHaveProperty('fragment', expect.any(String))
      expect(resolver).toHaveProperty('resolve', expect.any(Function))
    })

    it('should resolve to static value if available', async () => {
      const { resolve } = metadata('field')
      expect(await resolve({ field: 'value' })).toBe('value')
    })

    it('should resolve using analysis if static value is not available', async () => {
      const { resolve } = metadata('field')

      load.mockReturnValueOnce(getAnalysis({ field: 'value' }))

      expect(await resolve({ name: 'name' })).toBe('value')
      expect(load).toHaveBeenCalledTimes(1)
      expect(load).toHaveBeenCalledWith('name')
    })

    it('should transform resulting value, if transform provided', async () => {
      const transform = jest.fn((value: string) => value.toUpperCase())
      const { resolve } = metadata('field', transform)

      expect(await resolve({ field: 'value' })).toBe('VALUE')
      expect(transform).toHaveBeenCalledWith('value')
    })
  })
})

declare var deepDescribe: any
