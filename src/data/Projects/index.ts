import gql from 'graphql-tag'
import { BidaDepartment } from '../__generated-types'
import { NodeProjectsDependencies } from './__generated-types/NodeProjectsDependencies'
import { NodeProjectDependencies } from './__generated-types/NodeProjectDependencies'
import { GithubRepository } from '../Repository/__generated-types/GithubRepository'
import PackageJSON from '../package-json'
import { path } from 'ramda'
import { LocalProject } from '../../config/resolvers/Query/__generated-types/LocalProject'
import {
  NodeProject,
  NodeProject_dependencies
} from '../../config/resolvers/Query/__generated-types/NodeProject'

export async function getNodeProjectsDependencies (department: BidaDepartment) {
  const { default: client } = await import('../../config/apolloClient')
  const result = client.readFragment<NodeProjectsDependencies>({
    fragmentName: 'NodeProjectsDependencies',
    fragment: gql`
      fragment NodeProjectsDependencies on BidaProjectCollection {
        nodes {
          ...NodeProjectDependencies
        }
      }
      fragment NodeProjectDependencies on BidaNodeProject {
        id
        name
        dependencies {
          id
          name
          version
        }
      }
    `,
    id: `BidaProjectCollection:${department}`
  })
  return result ? (result.nodes as NodeProjectDependencies[]) : []
}

export const GITHUB_REPOSITORY_FRAGMENT = gql`
  fragment GithubRepository on Repository {
    id
    name
    url
    pushedAt
    isArchived
    package: object(expression: "HEAD:package.json") {
      ... on Blob {
        id
        text
      }
    }
  }
`

export const toLocalProjects = (
  department: BidaDepartment,
  repositories: GithubRepository[]
): LocalProject[] =>
  repositories.reduce<LocalProject[]>((acc, repository) => {
    const project = toLocalProject(department, repository)
    if (project) acc.push(project)
    return acc
  }, [])

export const toLocalProject = (
  department: BidaDepartment,
  repository: GithubRepository
): LocalProject | null => {
  switch (department) {
    case BidaDepartment.ANDROID:
      return nameFilter(/^([\w-]+)-(android)/)(repository)
        ? toAndroidProject(repository)
        : null
    case BidaDepartment.BACKEND:
      return nameFilter(/^([\w-]+)-(backend|monorepo)/)(repository) &&
        blobFilter(repository)
        ? toNodeProject(department)(repository)
        : null
    case BidaDepartment.FRONTEND:
      return nameFilter(
        /^([\w-]+)-(frontend|web|rn|react-native|monorepo|admin)/
      )(repository) && blobFilter(repository)
        ? toNodeProject(department)(repository)
        : null
    case BidaDepartment.IOS:
      return nameFilter(/^([\w-]+)-(ios)/)(repository)
        ? toIOSProject(repository)
        : null
    default:
      return null
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
