import { Repository } from './Repository'

const { departments } = Repository

describe('api/bida/projects/resolvers/Repository', () => {
  const topics = (...names: string[]) => ({
    nodes: names.map(name => ({ topic: { name } })),
  })

  describe('::departments', () => {
    const { resolve } = departments

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
