/**
 * Query::projects
 *
 * Resolves all projects of the provided department inside strvcom org.
 */
const projects = (root: any, args: any, context: any, info: any) => {
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
    args: { type, query, ...search }
  })
}

/**
 * Query::project
 *
 * Resolves a project inside strvcom org based on name.
 */
const project = (root: any, { name }: any, context: any, info: any) => {
  const { schema, mergeInfo } = info

  const owner = 'strvcom'

  return mergeInfo.delegateToSchema({
    info,
    schema,
    context,
    operation: 'query',
    fieldName: 'repository',
    args: { name, owner }
  })
}

export const Query = { projects, project }
