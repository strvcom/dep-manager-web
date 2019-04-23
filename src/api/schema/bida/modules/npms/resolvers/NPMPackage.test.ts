import { NPMPackage, __get__, __set__ } from './NPMPackage'

const load = jest.fn()
const attachAnalysis = __get__('attachAnalysis')

__set__('loaders', { analysis: { load } })

deepDescribe('api/bida/npm/resolvers/NPMPackage', () => {
  describe('attachAnalysis', () => {
    it('should attach "analysis" field', async () => {
      const pack = { name: 'name' }
      const analysis = { result: 'value' }

      load.mockReturnValueOnce(analysis)

      await expect(attachAnalysis(pack)).resolves.toEqual({ ...pack, analysis })
    })
  })
})

declare var deepDescribe: any
