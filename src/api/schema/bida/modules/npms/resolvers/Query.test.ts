import { Query, __set__ } from './Query'

const spy = jest.fn()
const { npmPackage: resolve } = Query

__set__('loaders', { analysis: { load: spy } })

deepDescribe('api/bida/npm/resolvers/Query/npmPackage', () => {
  it('should extract metadata', async () => {
    const name = 'name'
    const metadata = { name: 'name', version: '1.0.0' }

    spy.mockReturnValueOnce(Promise.resolve({ collected: { metadata } }))

    await expect(resolve(null, { name })).resolves.toEqual(metadata)
  })
})

declare var deepDescribe: any
