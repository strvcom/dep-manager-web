import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Category } from '../../config/types'
import ToolBar from '../../components/ToolBar'
import Anchor from '../../components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import DependenciesTable from './DependenciesTable'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from '../Dashboard/RecentUpdates'
import toBidaDepartment from '../../utils/toDepartment'
import { Body } from '../../components/Typography'
import gql from 'graphql-tag'
import { useQuery } from '../../utils/apollo-hooks'
import {
  ProjectDetailsData,
  ProjectDetailsDataVariables
} from './__generated-types/ProjectDetailsData'
import Loading from '../../components/Loading'

export type ProjectDetailsProps = RouteComponentProps<{
  department: string
  category: Category
  id: string
}>

function ProjectDetails (props: ProjectDetailsProps) {
  const department = toBidaDepartment(props.match!.params.department)
  const now = new Date()
  const firstDayOfMonth = React.useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
    [now.getFullYear(), now.getMonth()]
  )
  const { data, loading } = ProjectDetails.useData({
    department,
    from: firstDayOfMonth,
    id: props.match!.params.id
  })
  const { project, recentLibraries } = data
  if (loading) return <Loading />
  if (project.__typename !== 'BidaNodeProject') return null
  return (
    <React.Fragment>
      <ToolBar
        title={project.name}
        subtitle={
          <Anchor target='__blank' href={project.url}>
            {project.url}
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
            dependencies={project.dependencies}
          />
        </Content>
        <Sidebar>
          <RecentUpdates libraries={recentLibraries.nodes} />
          <ActualityWidget
            title='Libraries Actuality'
            mt={20}
            outdated={recentLibraries.outdatedDependentsCount}
            total={recentLibraries.totalCount}
          />
        </Sidebar>
      </Wrapper>
    </React.Fragment>
  )
}

ProjectDetails.DATA_QUERY = gql`
  query ProjectDetailsData(
    $department: BidaDepartment!
    $from: Date!
    $id: String!
  ) {
    recentLibraries: libraries(
      department: $department
      from: $from
      projectId: $id
    ) @client {
      id
      outdatedDependentsCount
      totalCount
      nodes {
        ... on BidaNodeLibrary {
          id
          name
          version
          date
        }
      }
    }
    project(department: $department, id: $id) @client {
      ... on BidaNodeProject {
        id
        name
        url
        dependencies {
          id
          name
          version
          library {
            id
            version
            license
          }
        }
      }
    }
  }
`
ProjectDetails.useData = (variables: ProjectDetailsDataVariables) =>
  useQuery<ProjectDetailsData, ProjectDetailsDataVariables>(
    ProjectDetails.DATA_QUERY,
    {
      variables
    },
    [variables.department, variables.id, variables.from]
  )

export default React.memo(ProjectDetails)
