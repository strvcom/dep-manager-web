import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Category } from '../../config/types'
import ToolBar from '../../components/ToolBar'
import { useRepository, isBlob } from '../../data/Repository'
import Anchor from '../../components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import DependenciesTable from './DependenciesTable'
import { useLibraries } from '../../data/Library'
import toUpper from 'ramda/es/toUpper'
import { Department } from '../../data/__generated-types'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from '../Dashboard/RecentUpdates'
// import toUpper from 'ramda/es/toUpper';
// import { useRepositories } from '../../data/Repository';
// import { Department } from '../../data/__generated-types';

export type ProjectDetailsProps = RouteComponentProps<{
  department: string
  category: Category
  id: string
}>

const ProjectDetails = (props: ProjectDetailsProps) => {
  const {
    match: {
      params: { id }
    }
  } = props
  const department = toUpper(props.match.params.department) as Department
  const {
    data: { repository }
  } = useRepository({ name: id })
  if (!repository || !repository.object || !isBlob(repository.object)) {
    return null
  }
  const { data: libraries } = useLibraries({
    department,
    repository: repository && repository.id
  })
  const now = new Date()
  const firstDayOfMonth = React.useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
    [now.getFullYear(), now.getMonth()]
  )
  const { data: recentLibraries } = useLibraries({
    department,
    repository: repository && repository.id,
    range: { from: firstDayOfMonth }
  })
  if (!libraries || !recentLibraries) return null
  const { outdated, total } = React.useMemo(
    () =>
      libraries.reduce(
        (acc, { totalDependents, outdatedDependents }) => ({
          outdated: acc.outdated + outdatedDependents,
          total: acc.total + totalDependents
        }),
        { outdated: 0, total: 0 }
      ),
    [libraries]
  )
  return (
    <React.Fragment>
      <ToolBar
        title={repository.name}
        subtitle={
          <Anchor target='__blank' href={repository.url}>
            {repository.url}
          </Anchor>
        }
      />
      <Wrapper>
        <Content>
          <h2>Project libraries</h2>
          <div>
            <Input placeholder='Search for libraries' />
          </div>
          <DependenciesTable
            baseUrl={`/${props.match.params.department}/${Category.LIBRARIES}`}
            dependencies={repository.object.package!.dependencies}
          />
        </Content>
        <Sidebar>
          <RecentUpdates libraries={recentLibraries} />
          <ActualityWidget
            title='Libraries Actuality'
            mt={20}
            outdated={outdated}
            total={total}
          />
        </Sidebar>
      </Wrapper>
    </React.Fragment>
  )
}

export default React.memo(ProjectDetails)
