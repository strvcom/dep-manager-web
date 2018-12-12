import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Category } from '../../config/types'
import ToolBar from '../../components/ToolBar'
import { useRepository, isBlob } from '../../data/Repository'
import Anchor from '../../components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import DependenciesTable from './DependenciesTable'
import { useLibraries } from '../../data/Library'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from '../Dashboard/RecentUpdates'
import toDepartment from '../../utils/toDepartment'
import { Body } from '../../components/Typography'
// import { useRepositories } from '../../data/Repository';
// import { Department } from '../../data/__generated-types';

export type ProjectDetailsProps = RouteComponentProps<{
  department: string
  category: Category
  id: string
}>

const ProjectDetails = (props: ProjectDetailsProps) => {
  const department = toDepartment(props.match!.params.department)
  const {
    data: { repository }
  } = useRepository({ name: props.match!.params.id })
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
          <Body>Project libraries</Body>
          <div>
            <Input placeholder='Search for libraries' />
          </div>
          <DependenciesTable
            baseUrl={`/${props.match!.params.department}/${Category.LIBRARIES}`}
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
