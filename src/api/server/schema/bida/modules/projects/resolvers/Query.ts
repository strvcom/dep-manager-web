import * as GT from '~generated/types'
import { ReusableResolvers } from '~app/utils/type-utils'

const Query: ReusableResolvers<GT.QueryResolvers, 'projects'> = {
  /**
   * Resolves all projects of the provided department inside strvcom org.
   */
  projects: (_root, args, context, info) => {
    const { department, archived, ...search } = args
    const { schema, mergeInfo } = info

    const type = 'REPOSITORY'
    const queryParts = ['user:strvcom']

    if (department) {
      queryParts.push(`topic:${department.toLowerCase()}`)
    }

    if (typeof archived !== 'undefined') {
      queryParts.push(`archived:${archived}`)
    }

    const query = queryParts.join(' ')

    return mergeInfo.delegateToSchema({
      info,
      schema,
      context,
      operation: 'query',
      fieldName: 'search',
      args: { type, query, ...search },
    })
  },

  /**
   * Resolves a project inside strvcom org based on name.
   */
  project: (_root, { name }, context, info) => {
    const { schema, mergeInfo } = info

    const owner = 'strvcom'

    return mergeInfo.delegateToSchema({
      info,
      schema,
      context,
      operation: 'query',
      fieldName: 'repository',
      args: { name, owner },
    })
  },
}

export { Query }
