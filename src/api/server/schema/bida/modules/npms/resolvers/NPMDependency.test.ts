import { NPMDependency } from './NPMDependency'
import { analysis } from '../loaders'

jest.mock('../loaders', () => ({ analysis: { load: jest.fn() } }))

const { load } = analysis as any

describe('api/bida/npm/resolvers/NPMDependency/outdateStatus', () => {
  beforeEach(jest.clearAllMocks)

  const { resolve } = NPMDependency.outdateStatus as any
  const getAnalysis = (metadata: any = {}) => ({ collected: { metadata } })

  it('should resolve to UNKNOWN when not version known', async () => {
    load.mockReturnValueOnce(getAnalysis())
    expect(await resolve({ name: 'name' })).toEqual('UNKNOWN')
  })

  it('should resolve PATCH distances', async () => {
    load.mockReturnValueOnce(getAnalysis({ version: '1.0.1' }))
    expect(await resolve({ version: '1.0.0' })).toEqual('PATCH')
  })

  it('should resolve MINOR distances', async () => {
    load.mockReturnValueOnce(getAnalysis({ version: '1.1.0' }))
    expect(await resolve({ version: '1.0.0' })).toEqual('MINOR')
  })

  it('should resolve MAJOR distances', async () => {
    load.mockReturnValueOnce(getAnalysis({ version: '2.0.0' }))
    expect(await resolve({ version: '1.0.0' })).toEqual('MAJOR')
  })
})
