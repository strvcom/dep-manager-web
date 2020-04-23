import { Query } from './Query'

const { projects, project } = Query

// @ts-ignore
describe('api/bida/projects/resolvers', () => {
  beforeEach(jest.clearAllMocks)

  describe('Query::project', () => {
    it('should delegate', async () => {
      const delegateToSchema = jest.fn()
      const info = { mergeInfo: { delegateToSchema } }

      await project(null, {}, null, info)

      expect(delegateToSchema).toHaveBeenCalledTimes(1)
    })

    it('should append owner to arguments', async () => {
      const delegateToSchema = jest.fn()
      const args = { name: 'name' }
      const info = { mergeInfo: { delegateToSchema } }

      await project(null, { name: 'name' }, null, info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          args: { ...args, owner: 'strvcom' },
        })
      )
    })

    it('should delegate with all arguments', async () => {
      const delegateToSchema = jest.fn()
      const info = { schema: 'schema', mergeInfo: { delegateToSchema } }

      await project(null, { name: 'name' }, 'context', info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          info,
          schema: 'schema',
          context: 'context',
          operation: 'query',
          fieldName: 'repository',
          args: { name: 'name', owner: 'strvcom' },
        })
      )
    })
  })

  describe('Query::projects', () => {
    it('should delegate', async () => {
      const delegateToSchema = jest.fn()
      const info = { mergeInfo: { delegateToSchema } }

      await projects(null, {}, null, info)

      expect(delegateToSchema).toHaveBeenCalledTimes(1)
    })

    it('should delegate with fixed arguments', async () => {
      const delegateToSchema = jest.fn()
      const info = { mergeInfo: { delegateToSchema } }

      await projects(null, {}, null, info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          args: { query: 'user:strvcom', type: 'REPOSITORY' },
        })
      )
    })

    it('should delegate with configurable arguments', async () => {
      const delegateToSchema = jest.fn()
      const args = { archived: true, department: 'FRONTEND', extra: 'value' }
      const info = { mergeInfo: { delegateToSchema } }

      await projects(null, args, null, info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          args: {
            query: 'user:strvcom topic:frontend archived:true',
            type: 'REPOSITORY',
            extra: 'value',
          },
        })
      )
    })

    it('should delegate with all arguments', async () => {
      const delegateToSchema = jest.fn()
      const args = { archived: true, department: 'FRONTEND', extra: 'value' }
      const info = { schema: 'schema', mergeInfo: { delegateToSchema } }

      await projects(null, args, 'context', info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          info,
          schema: 'schema',
          context: 'context',
          operation: 'query',
          fieldName: 'search',
          args: {
            query: 'user:strvcom topic:frontend archived:true',
            type: 'REPOSITORY',
            extra: 'value',
          },
        })
      )
    })
  })
})
