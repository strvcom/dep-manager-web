import { BidaDepartment } from '../__generated-types'
import { fetchPackages } from '../npms'
import { License } from '../../config/types'
import { getNodeProjectsDependencies } from '../Projects'
import { NodeProjectDependencies } from '../Projects/__generated-types/NodeProjectDependencies'

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
  const data = Object.values(packages).map(
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
        totalDependents: dependents.length,
        __typename: 'BidaNodeLibrary' as 'BidaNodeLibrary'
      }
    }
  )
  return data
}

function createDependentsMap (projects: NodeProjectDependencies[]) {
  const map = new Map<string, any[]>()
  projects.forEach(({ dependencies, id, name, __typename }) => {
    if (!Array.isArray(dependencies)) return
    dependencies.forEach(dependency => {
      const dependents = mapGet(map, dependency.name, [])
      dependents.push({
        __typename: 'NodeLibraryDependent',
        id: `${__typename}:${id}:${dependency.name}`,
        name: dependency.name || name,
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
