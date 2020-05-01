import { NPMPackage, attachAnalysis, metadata } from './NPMPackage'
import { analysis as analysisLoader } from '../loaders'

jest.mock('../loaders', () => ({ analysis: { load: jest.fn() } }))

const { load } = analysisLoader as any

describe('api/bida/npm/resolvers/NPMPackage', () => {
  beforeEach(jest.clearAllMocks)

  const getAnalysis = (meta: any = {}) => ({ collected: { metadata: meta } })

  describe('attachAnalysis', () => {
    it('should attach "analysis" field', async () => {
      const pack = { name: 'name' } as any
      const analysis = { result: 'value' } as any

      load.mockReturnValueOnce(analysis)

      await expect(attachAnalysis(pack)).resolves.toEqual({ ...pack, analysis })
    })

    it('should throw when no name provided', async () => {
      await expect(attachAnalysis({} as any)).rejects.toThrow('without "name"')
    })
  })

  describe('metadata', () => {
    it('should create a new metadata field resolver', () => {
      const resolver = metadata('field')

      expect(resolver).toHaveProperty('fragment', expect.any(String))
      expect(resolver).toHaveProperty('resolve', expect.any(Function))
    })

    it('should resolve to static value if available', async () => {
      const { resolve } = metadata('field')
      expect(await resolve({ field: 'value' } as any)).toBe('value')
    })

    it('should resolve using analysis if static value is not available', async () => {
      const { resolve } = metadata('field')

      load.mockReturnValueOnce(getAnalysis({ field: 'value' }))

      expect(await resolve({ name: 'name' } as any)).toBe('value')
      expect(load).toHaveBeenCalledTimes(1)
      expect(load).toHaveBeenCalledWith('name')
    })

    it('should transform resulting value, if transform provided', async () => {
      const transform = jest.fn((value: string) => value.toUpperCase())
      const { resolve } = metadata('field', transform)

      expect(await resolve({ field: 'value' } as any)).toBe('VALUE')
      expect(transform).toHaveBeenCalledWith('value')
    })

    describe('license', () => {
      it('should get license from metadata', async () => {
        const { resolve } = NPMPackage.license as any
        load.mockReturnValueOnce(getAnalysis({ license: 'MIT' }))
        expect(await resolve({ name: 'name' })).toBe('MIT')
      })
    })

    describe('description', () => {
      it('should get description from metadata', async () => {
        const { resolve } = NPMPackage.description as any
        load.mockReturnValueOnce(getAnalysis({ description: 'value' }))
        expect(await resolve({ name: 'name' })).toBe('value')
      })
    })

    describe('private', () => {
      it('should get private from metadata', async () => {
        const { resolve } = NPMPackage.private as any
        load.mockReturnValueOnce(getAnalysis({ private: true }))
        expect(await resolve({ name: 'name' })).toBe(true)
      })
    })

    describe('updatedAt', () => {
      it('should get updatedAt from metadata', async () => {
        const { resolve } = NPMPackage.updatedAt as any
        load.mockReturnValueOnce(getAnalysis({ date: 'value' }))
        expect(await resolve({ name: 'name' })).toBe('value')
      })
    })

    describe('version', () => {
      it('should get version from metadata', async () => {
        const { resolve } = NPMPackage.version as any
        load.mockReturnValueOnce(getAnalysis({ version: 'value' }))
        expect(await resolve({ name: 'name' })).toBe('value')
      })
    })
  })

  describe('analysis', () => {
    it('should resolve analysis for a package', async () => {
      const { resolve } = NPMPackage.analysis as any
      const analysis = getAnalysis({ field: 'value' })
      load.mockReturnValueOnce(analysis)
      expect(await resolve({ name: 'name' })).toEqual(analysis)
    })
  })
})
