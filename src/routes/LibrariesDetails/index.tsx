import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Category } from '../../config/types'
import ToolBar from '../../components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import { useLibrary } from '../../data/Library'
import DependentsTable from './DependentsTable'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import toDepartment from '../../utils/toDepartment'

export type ProjectDetailsProps = RouteComponentProps<{
  department: string
  category: Category
  id: string
}>

const ProjectDetails = (props: ProjectDetailsProps) => {
  const department = toDepartment(props.match!.params.department)
  const {
    data: { library }
  } = useLibrary({ id: props.match!.params.id, department })
  if (!library) return null
  return (
    <React.Fragment>
      <ToolBar title={library.name} subtitle={library.version} />
      <Wrapper>
        <Content>
          <h2>Library projects</h2>
          <div>
            <Input placeholder='Search for projects' />
          </div>
          <DependentsTable
            baseUrl={`/${props.match!.params.department}/${Category.PROJECTS}`}
            libraryVersion={library.version}
            dependents={library.dependents}
          />
        </Content>
        <Sidebar>
          <ActualityWidget
            title='Projects Actuality'
            mt={20}
            outdated={library.outdatedDependents}
            total={library.totalDependents}
          />
        </Sidebar>
      </Wrapper>
    </React.Fragment>
  )
}

export default React.memo(ProjectDetails)
