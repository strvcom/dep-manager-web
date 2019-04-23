import { Query, __set__ } from './Query'

const load = jest.fn()
const { projects, project } = Query

__set__('loaders', { analysis: { load } })

deepDescribe('api/bida/projects/resolvers', () => {
  beforeEach(jest.clearAllMocks)

  describe('Query::project', () => {
    it('should delegate', () => {
      const delegateToSchema = jest.fn()
      const info = { mergeInfo: { delegateToSchema } }

      project(null, {}, null, info)

      expect(delegateToSchema).toHaveBeenCalledTimes(1)
    })

    it('should append owner to arguments', () => {
      const delegateToSchema = jest.fn()
      const args = { name: 'name' }
      const info = { mergeInfo: { delegateToSchema } }

      project(null, { name: 'name' }, null, info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          args: { ...args, owner: 'strvcom' }
        })
      )
    })

    it('should delegate with all arguments', () => {
      const delegateToSchema = jest.fn()
      const info = { schema: 'schema', mergeInfo: { delegateToSchema } }

      project(null, { name: 'name' }, 'context', info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          info,
          schema: 'schema',
          context: 'context',
          operation: 'query',
          fieldName: 'repository',
          args: { name: 'name', owner: 'strvcom' }
        })
      )
    })
  })

  describe('Query::projects', () => {
    it('should delegate', () => {
      const delegateToSchema = jest.fn()
      const info = { mergeInfo: { delegateToSchema } }

      projects(null, {}, null, info)

      expect(delegateToSchema).toHaveBeenCalledTimes(1)
    })

    it('should delegate with fixed arguments', () => {
      const delegateToSchema = jest.fn()
      const info = { mergeInfo: { delegateToSchema } }

      projects(null, {}, null, info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          args: { query: 'user:strvcom', type: 'REPOSITORY' }
        })
      )
    })

    it('should delegate with configurable arguments', () => {
      const delegateToSchema = jest.fn()
      const args = { archived: true, department: 'FRONTEND', extra: 'value' }
      const info = { mergeInfo: { delegateToSchema } }

      projects(null, args, null, info)

      expect(delegateToSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          args: {
            query: 'user:strvcom topic:frontend archived:true',
            type: 'REPOSITORY',
            extra: 'value'
          }
        })
      )
    })

    it('should delegate with all arguments', () => {
      const delegateToSchema = jest.fn()
      const args = { archived: true, department: 'FRONTEND', extra: 'value' }
      const info = { schema: 'schema', mergeInfo: { delegateToSchema } }

      projects(null, args, 'context', info)

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
            extra: 'value'
          }
        })
      )
    })
  })
})

declare var deepDescribe: any
