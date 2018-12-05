import React from 'react'
import { RouteComponentProps } from 'react-router'
import { Category } from '../../config/types'
import ToolBar from '../../components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import { useLibrary } from '../../data/Library'
import toUpper from 'ramda/es/toUpper'
import { Department } from '../../data/__generated-types'
import DependentsTable from './DependentsTable'
import ActualityWidget from '../../containers/LibrariesActualityWidget'

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
    data: { library }
  } = useLibrary({ id, department })
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
            baseUrl={`/${props.match.params.department}/${Category.PROJECTS}`}
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
