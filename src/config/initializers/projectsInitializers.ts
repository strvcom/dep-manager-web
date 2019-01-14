import { Initializers } from '../../utils/apollo-utils'
import { BidaDepartment } from '../../data/__generated-types'
import { queryRepositories } from '../../data/Repository/index'
import { toLocalProjects } from '../../data/Projects/index'
import { fetchLibraries } from '../../data/Library/index'

export default function projectsInitializers (
  department: BidaDepartment
): Initializers {
  return [
    {
      [`projects(${JSON.stringify({ department })})`]: async () => ({
        id: department,
        nodes: toLocalProjects(department, await queryRepositories()),
        __typename: 'BidaProjectCollection'
      })
    },
    {
      [`libraries(${JSON.stringify({ department })})`]: async () => ({
        __typename: 'BidaLibraryCollection',
        id: department,
        department,
        nodes: await fetchLibraries(department)
      })
    }
  ]
}
