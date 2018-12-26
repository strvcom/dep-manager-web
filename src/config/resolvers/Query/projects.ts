import { BidaDepartment } from '../../../data/__generated-types'
import { path } from 'ramda'
import PackageJSON from '../../../data/package-json'
import gql from 'graphql-tag'
import { LocalProjectCollection } from './__generated-types/LocalProjectCollection'
import { LocalProject } from './__generated-types/LocalProject'
import {
  NodeProject,
  NodeProject_dependencies
} from './__generated-types/NodeProject'
import { createResolver } from '../../../utils/ResolverFunction'
import {
  ProjectsRoot,
  ProjectsRootVariables
} from './__generated-types/ProjectsRoot'
import { queryRepositories } from '../../../data/Repository/index'
import { GithubRepository } from '../../../data/Repository/__generated-types/GithubRepository'

gql`
  fragment LocalProjectCollection on BidaProjectCollection {
    id
    totalArchived
    totalCount
    nodes {
      ...LocalProject
    }
  }
  fragment LocalProject on BidaProject {
    id
    name
    url
    pushedAt
    isArchived
  }
  fragment NodeProject on BidaNodeProject {
    id
    name
    url
    pushedAt
    department
    isArchived
    version
    dependencies {
      id
      name
      version
    }
  }
  query ProjectsRoot($department: BidaDepartment!) {
    projects(department: $department) {
      id
    }
  }
`

export default createResolver<
ProjectsRoot,
ProjectsRootVariables,
Promise<LocalProjectCollection>
>(async ({ variables }) => {
  const { department } = variables
  const nodes = toLocalProjects(department, await queryRepositories())
  const data: LocalProjectCollection = {
    id: department,
    totalArchived: nodes.filter(node => node.isArchived).length,
    totalCount: nodes.length,
    nodes,
    __typename: 'BidaProjectCollection'
  }
  return data
})

const toLocalProjects = (
  department: BidaDepartment,
  repositories: GithubRepository[]
): LocalProject[] => {
  switch (department) {
    case BidaDepartment.ANDROID:
      return repositories
        .filter(nameFilter(/^([\w-]+)-(android)/))
        .map(toAndroidProject)
    case BidaDepartment.BACKEND:
      return repositories
        .filter(nameFilter(/^([\w-]+)-(backend|monorepo)/))
        .filter(blobFilter)
        .map(toNodeProject(department))
    case BidaDepartment.FRONTEND:
      return repositories
        .filter(
          nameFilter(/^([\w-]+)-(frontend|web|rn|react-native|monorepo|admin)/)
        )
        .filter(blobFilter)
        .map(toNodeProject(department))
    case BidaDepartment.IOS:
      return repositories
        .filter(nameFilter(/^([\w-]+)-(ios)/))
        .map(toIOSProject)
    default:
      return []
  }
}

const nameFilter = (regex: RegExp) => (repository: GithubRepository) =>
  Boolean(repository.name.match(regex))

const blobFilter = (repository: GithubRepository) =>
  Boolean(repository.package && repository.package.__typename === 'Blob')

const toNodeProject = (department: BidaDepartment) => (
  repository: GithubRepository
): NodeProject => {
  const { dependencies = {}, version }: PackageJSON = JSON.parse(
    path<string>(['package', 'text'], repository)!
  )
  return {
    ...repository,
    __typename: 'BidaNodeProject',
    department,
    dependencies: Object.entries(dependencies).map<NodeProject_dependencies>(
      ([key, value]) => ({
        __typename: 'BidaNodeProjectDependency',
        version: value,
        name: key,
        id: `${key}:${value}`
      })
    ),
    version: version || null
  }
}

function toAndroidProject (repository: GithubRepository): LocalProject {
  return {
    ...repository,
    __typename: 'BidaAndroidProject'
  }
}
function toIOSProject (repository: GithubRepository): LocalProject {
  return {
    ...repository,
    __typename: 'BidaIOSProject'
  }
}
