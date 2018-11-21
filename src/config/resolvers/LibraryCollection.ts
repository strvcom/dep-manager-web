import { ResolverFunction } from '../../utils/ResolverFunction'
import { TNodeLibrary, Repository, Repositories, NodePackage } from '../types'
import PackageJSON from '../../utils/package-json'
import { REPOSITORIES_FRAGMENT } from '../../data/Repository'
import prop from 'ramda/es/prop'
import compose from 'ramda/es/compose'

const nodes: ResolverFunction = async (_, __, { cache }) => {
  const data = cache.readFragment<Repositories>({
    fragment: REPOSITORIES_FRAGMENT,
    fragmentName: 'Repositories',
    id: 'RepositoryConnection'
  })
  if (!data || !data.nodes) return null
  const names = extractDependencies(data.nodes as Repository[])
  const response = await fetchLibraries(Array.from(names))
  if (!response.ok) throw new Error(response.status.toString())
  const record: Record<any, Package> = await response.json()
  const libraries = Object.values(record).map<TNodeLibrary>(
    ({ collected: { metadata } }) => ({
      ...metadata,
      id: metadata.name,
      __typename: 'NodeLibrary'
    })
  )
  return libraries
}

export default {
  nodes
}

const fetchLibraries = (names: string[]) =>
  fetch('https://api.npms.io/v2/package/mget', {
    method: 'POST',
    body: JSON.stringify(names),
    headers: { 'Content-Type': 'application/json' }
  })

export interface Package {
  analyzedAt: string
  collected: {
    metadata: Metadata
  }
}
export interface Metadata {
  name: string
  scope: string
  version: string
  description: string
  keywords: string[]
  date: string
  publisher: User
  maintainers: User[]
  repository: Repository
  links: Links
  license: string
  dependencies: Dependencies
  releases: Release[]
  hasSelectiveFiles: boolean
}

export interface Dependencies {
  [dependency: string]: string
}

export interface Links {
  npm: string
  homepage: string
  repository: string
  bugs: string
}

export interface User {
  username: string
  email: string
}

export interface Release {
  from: string
  to: string
  count: number
}

export interface Repository {
  type: string
  url: string
}

function extractDependencies (data: Repository[]) {
  return extractPackages(data || []).reduce((set, pack) => {
    Object.keys(pack.dependencies || {}).forEach(set.add.bind(set))
    return set
  }, new Set<string>())
}

function parse (json: string | null) {
  if (json) return JSON.parse(json)
  return null
}
function extractPackages (projects: Repository[]): PackageJSON[] {
  return (projects.map(prop('object')).filter(Boolean) as NodePackage[]).map(
    compose(
      parse,
      prop('text')
    )
  )
}
