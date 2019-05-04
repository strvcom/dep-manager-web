import React, { memo, useState, FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { prop } from 'ramda'

import ToolBar from '../../components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../components/ActualityWidget'
import NodeLibraryDependentsTable from '../../components/NodeLibraryDependentsTable'
import { BidaDepartment } from '../../config/types'
import Loading from '../../components/Loading'

import AuthenticatedQuery from '../../containers/AuthenticatedQuery'

import NODE_LIBRARY_QUERY from './query.gql'

import {
  NODE_LIBRARY_QUERY as IData,
  NODE_LIBRARY_QUERYVariables as IVariables,
  NODE_LIBRARY_QUERY_library_dependents_edges_node_Dependent as IDependent,
} from './graphql-types/NODE_LIBRARY_QUERY'

export interface IProps extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeLibraryDetails: FunctionComponent<IProps> = ({ match, department }: IProps) => {
  const name = decodeURIComponent(match.params.id)
  const [search, setSearch] = useState('')

  const cacheKey = department + name + search

  return (
    <AuthenticatedQuery<IData, IVariables>
      query={NODE_LIBRARY_QUERY}
      variables={{ name, department }}
      children={({ data, loading, error }) => {
        if (error) throw error
        if (loading) return <Loading />
        if (!data || !data.library) return null

        const { library } = data

        const dependents = (library.dependents.edges || []).map(prop('node')) as IDependent[]
        const outdated = dependents.filter(({ outdateStatus }) => outdateStatus === 'MAJOR')
        const filtered = dependents.filter(({ repository }) => repository.name.includes(search))

        return (
          <>
            <ToolBar title={library.name} subtitle={library.version} />
            <Wrapper>
              <Content>
                <h2>Library projects</h2>
                <div>
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search for projects"
                  />
                </div>

                <NodeLibraryDependentsTable
                  libraryVersion={library.version}
                  dependents={filtered}
                  department={department}
                  cacheKey={cacheKey}
                />
              </Content>

              <Sidebar>
                <ActualityWidget
                  title="Projects Actuality"
                  mt={20}
                  outdated={outdated.length}
                  total={dependents.length}
                />
              </Sidebar>
            </Wrapper>
          </>
        )
      }}
    />
  )
}

export default memo(NodeLibraryDetails)
