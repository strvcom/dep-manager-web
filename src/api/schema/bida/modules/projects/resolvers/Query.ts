import { set, lensPath, identity } from 'ramda'
import { GraphQLResolveInfo } from 'graphql'
import { GITHUB_OAUTH_TOKEN } from '../../../../../../config/env'

export interface Project {
  name: string
}

export interface ProjectEdge {
  cursor: string
  node: Project
}

interface ProjectsConnection {
  edges: ProjectEdge[]
}

export interface ProjectsArgs {
  department: string
  archived: boolean
}

// override authorization token to one with access to all STRV repos.
const authorize = GITHUB_OAUTH_TOKEN
  ? set(lensPath(['headers', 'authorization']), `Bearer ${GITHUB_OAUTH_TOKEN}`)
  : identity

/**
 * Query::projects
 *
 * Resolves all projects of the provided department inside strvcom org.
 */
const projects = (root: null, args: ProjectsArgs, context: unknown, info: GraphQLResolveInfo) => {
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

  return mergeInfo.delegateToSchema<ProjectsConnection>({
    info,
    schema,
    context: authorize(context),
    operation: 'query',
    fieldName: 'search',
    args: { type, query, ...search },
  })
}

interface IProjectArgs {
  name: string
}

/**
 * Query::project
 *
 * Resolves a project inside strvcom org based on name.
 */
const project = (
  root: null,
  { name }: IProjectArgs,
  context: unknown,
  info: GraphQLResolveInfo
) => {
  const { schema, mergeInfo } = info

  const owner = 'strvcom'

  return mergeInfo.delegateToSchema<Project>({
    info,
    schema,
    context: authorize(context),
    operation: 'query',
    fieldName: 'repository',
    args: { name, owner },
  })
}

export const Query = { projects, project }
