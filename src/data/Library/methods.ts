import { BidaDepartment } from '../__generated-types'
import { fetchPackages } from '../npms'
import { License } from '../../config/types'
import { getNodeProjectsDependencies } from '../Projects'
import { NodeProjectDependencies } from '../Projects/__generated-types/NodeProjectDependencies'
import gql from 'graphql-tag'
import { Dependent } from './__generated-types/Dependent'
import { BidaNodeLibrary } from './__generated-types/BidaNodeLibrary'

gql`
  fragment BidaNodeLibrary on BidaNodeLibrary {
    __typename
    id
    license
    date
    name
    version
    dependents {
      ...Dependent
    }
  }
  fragment Dependent on BidaNodeLibraryDependent {
    __typename
    id
    name
    version
  }
`

export async function fetchLibraries (department: BidaDepartment) {
  switch (department) {
    case BidaDepartment.FRONTEND:
      return fetchFrontendLibraries()
    default:
      return []
  }
}

async function fetchFrontendLibraries () {
  const dependentsMap = createDependentsMap(
    await getNodeProjectsDependencies(BidaDepartment.FRONTEND)
  )
  const packages = await fetchPackages(Array.from(dependentsMap.keys()))
  const data = Object.values(packages).map<BidaNodeLibrary>(
    ({
      collected: {
        metadata: { date, license, name, version }
      }
    }) => {
      const dependents = dependentsMap.get(name) || []
      return {
        id: name,
        dependents,
        license: license || null,
        date,
        name,
        version,
        __typename: 'BidaNodeLibrary'
      }
    }
  )
  return data
}

function createDependentsMap (projects: NodeProjectDependencies[]) {
  const map = new Map<string, Dependent[]>()
  projects.forEach(({ dependencies, id, name, __typename }) => {
    if (!Array.isArray(dependencies)) return
    dependencies.forEach(dependency => {
      const dependents = mapGet(map, dependency.name, [])
      dependents.push({
        __typename: 'BidaNodeLibraryDependent',
        id: `${id}:${dependency.name}`,
        name,
        version: dependency.version
      })
    })
  })
  return map
}

function mapGet<Key, Value> (
  map: Map<Key, Value>,
  key: Key,
  initialValue: Value
) {
  const value = map.get(key)
  if (value === undefined) {
    map.set(key, initialValue)
    return initialValue
  }
  return value
}

const licenses = Object.keys(License)
export function isValidLicense (license: string) {
  for (const currentLicense of licenses) {
    if (license.includes(currentLicense)) return true
  }
  return false
}
