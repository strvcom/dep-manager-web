import { combine } from './modules'

describe('api/lib/modules', () => {
  it('should always retrieve minimal shape', () => {
    expect(combine({}, {})).toHaveProperty('typeDefs', expect.any(String))
    expect(combine({}, {})).toHaveProperty('resolvers', {})
  })

  it('should combine typeDefs', () => {
    const a = { typeDefs: 'a' }
    const b = { typeDefs: 'b' }

    expect(combine(a, b).typeDefs).toBe('a\nb')
  })

  it('should combine resolver types', () => {
    const a = { resolvers: { A: {} } }
    const b = { resolvers: { B: {} } }

    expect(combine(a, b).resolvers).toEqual({ A: {}, B: {} })
  })

  it('should deply combine resolver types', () => {
    const first = () => {}
    const second = () => {}

    const a = { resolvers: { A: { first } } }
    const b = { resolvers: { A: { second } } }

    expect(combine(a, b).resolvers).toEqual({ A: { first, second } })
  })

  it('should privilege right assignments', () => {
    const first = () => {}
    const second = () => {}

    const a = { resolvers: { A: { first } } }
    const b = { resolvers: { A: { first: second } } }

    expect(combine(a, b).resolvers).toHaveProperty('A.first', second)
  })
})
