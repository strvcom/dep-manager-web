import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ToolBar from '../../components/ToolBar'
import Anchor from '../../components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from '../Dashboard/RecentUpdates'
import { Body } from '../../components/Typography'
import gql from 'graphql-tag'
import { useQuery } from '../../hooks/apollo-hooks'
import {
  ProjectDetailsData,
  ProjectDetailsDataVariables,
  ProjectDetailsData_project_BidaNodeProject
} from './__generated-types/ProjectDetailsData'
import Loading from '../../components/Loading'
import NodeProjectDependenciesTable from '../../containers/NodeProjectDependenciesTable'
import { BidaDepartment } from '../../data/__generated-types'
import useFirstDayOfMonth from '../../hooks/firstDayOfMonth'

export interface NodeProjectDetailsProps
  extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

function ProjectDetails (props: NodeProjectDetailsProps) {
  const { data, loading } = ProjectDetails.useData({
    department: props.department,
    from: useFirstDayOfMonth(),
    id: props.match!.params.id
  })
  const project = data.project as ProjectDetailsData_project_BidaNodeProject
  if (loading) return <Loading />
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
          <NodeProjectDependenciesTable
            dependencies={project.dependencies}
            department={props.department}
          />
        </Content>
        <Sidebar>
          <RecentUpdates libraries={project.recentLibraries.nodes} />
          <ActualityWidget
            title='Libraries Actuality'
            mt={20}
            outdated={project.libraries.outdatedDependentsCount}
            total={project.libraries.totalCount}
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
    project(department: $department, id: $id) @client {
      ... on BidaNodeProject {
        id
        name
        url
        recentLibraries: libraries(from: $from) {
          nodes {
            ... on BidaNodeLibrary {
              id
              name
              version
              date
            }
          }
        }
        libraries {
          id
          outdatedDependentsCount
          totalCount
        }
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
