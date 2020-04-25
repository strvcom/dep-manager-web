import { Repository } from './Repository'

describe('api/bida/projects/resolvers/Repository', () => {
  const topics = (...names: string[]) =>
    ({
      nodes: names.map((name) => ({ topic: { name } })),
    } as any)

  describe('::departments', () => {
    const { resolve } = Repository.departments as any

    it('should be empty if no topic available', () => {
      const repositoryTopics = topics()
      expect(resolve({ repositoryTopics })).toEqual([])
    })

    it('should be empty if no department equivalent topic found', () => {
      const repositoryTopics = topics('first', 'second')
      expect(resolve({ repositoryTopics })).toEqual([])
    })

    it('should return a department', () => {
      const repositoryTopics = topics('first', 'frontend', 'third')
      expect(resolve({ repositoryTopics })).toContain('FRONTEND')
    })

    it('should return multiple departments', () => {
      const repositoryTopics = topics('first', 'frontend', 'backend')
      expect(resolve({ repositoryTopics })).toContain('FRONTEND')
      expect(resolve({ repositoryTopics })).toContain('BACKEND')
    })
  })
})
