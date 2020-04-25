import { combine } from './modules'

describe('api/lib/modules', () => {
  it('should always retrieve minimal shape', () => {
    expect(combine({}, {})).toHaveProperty('typeDefs', expect.any(String))
    expect(combine({}, {})).toHaveProperty('resolvers', {})
  })

  it('should combine typeDefs', () => {
    const a = { typeDefs: 'a' } as any
    const b = { typeDefs: 'b' } as any

    expect(combine(a, b).typeDefs).toBe('a \n b')
  })

  it('should combine resolver types', () => {
    const a = { resolvers: { A: {} } } as any
    const b = { resolvers: { B: {} } } as any

    expect(combine(a, b).resolvers).toEqual({ A: {}, B: {} })
  })

  it('should deply combine resolver types', () => {
    const first = () => {}
    const second = () => {}

    const a = { resolvers: { A: { first } } } as any
    const b = { resolvers: { A: { second } } } as any

    expect(combine(a, b).resolvers).toEqual({ A: { first, second } })
  })

  it('should privilege right assignments', () => {
    const first = () => {}
    const second = () => {}

    const a = { resolvers: { A: { first } } } as any
    const b = { resolvers: { A: { first: second } } } as any

    expect(combine(a, b).resolvers).toHaveProperty('A.first', second)
  })
})
