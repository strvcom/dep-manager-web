import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import ToolBar from '../../components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import NodeLibraryDependentsTable from '../../containers/NodeLibraryDependentsTable'
import { BidaDepartment } from '../../data/__generated-types'
import gql from 'graphql-tag'
import {
  NodeLibraryDetailsDataVariables,
  NodeLibraryDetailsData
} from './__generated-types/NodeLibraryDetailsData'
import { useQuery } from '../../hooks/apollo-hooks'
import Loading from '../../components/Loading'

export interface NodeLibraryDetailsProps
  extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeLibraryDetails = ({ match, department }: NodeLibraryDetailsProps) => {
  const { data, loading } = NodeLibraryDetails.useData({
    id: decodeURIComponent(match!.params.id),
    department
  })
  const { library } = data
  if (loading) return <Loading />
  if (!library || library.__typename !== 'BidaNodeLibrary') return null
  return (
    <React.Fragment>
      <ToolBar title={library.name} subtitle={library.version} />
      <Wrapper>
        <Content>
          <h2>Library projects</h2>
          <div>
            <Input placeholder='Search for projects' />
          </div>
          <NodeLibraryDependentsTable
            libraryVersion={library.version}
            dependents={library.dependents}
            department={department}
          />
        </Content>
        <Sidebar>
          <ActualityWidget
            title='Projects Actuality'
            mt={20}
            outdated={library.outdatedDependentsCount}
            total={library.totalDependentsCount}
          />
        </Sidebar>
      </Wrapper>
    </React.Fragment>
  )
}

NodeLibraryDetails.DATA_QUERY = gql`
  query NodeLibraryDetailsData($id: String!, $department: BidaDepartment!) {
    library(id: $id, department: $department) @client {
      ...NodeLibraryDetail
    }
  }
  fragment NodeLibraryDetail on BidaNodeLibrary {
    id
    name
    version
    dependents {
      id
      version
      name
    }
    outdatedDependentsCount
    totalDependentsCount
  }
`

NodeLibraryDetails.useData = (variables: NodeLibraryDetailsDataVariables) =>
  useQuery<NodeLibraryDetailsData, NodeLibraryDetailsDataVariables>(
    NodeLibraryDetails.DATA_QUERY,
    {
      variables
    },
    [variables.department, variables.id]
  )

export default React.memo(NodeLibraryDetails)
