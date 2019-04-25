import React, { memo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { propEq } from 'ramda'

import ToolBar from '../../components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../components/ActualityWidget'
import NodeLibraryDependentsTable from '../../components/NodeLibraryDependentsTable'
import { BidaDepartment } from '../../config/types'
import Loading from '../../components/Loading'

import AuthenticatedQuery from '../../containers/AuthenticatedQuery'

import { NODE_LIBRARY_QUERY } from './query.gql'

export interface Props extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeLibraryDetails = ({ match, department }: Props) => {
  const name = decodeURIComponent(match!.params.id)
  const [search, setSearch] = useState('')

  const cacheKey = department + name + search

  return (
    <AuthenticatedQuery
      query={NODE_LIBRARY_QUERY}
      variables={{ name, department }}
    >
      {({ data, loading, error }: any) => {
        if (error) throw error
        if (loading) return <Loading />

        const { library } = data

        const outdated = library.dependents.edges.filter(
          propEq('outdatedStatus', 'MAJOR')
        )

        const filtered = library.dependents.edges.filter(({ node }: any) =>
          node.repository.name.includes(search)
        )

        return (
          <>
            <ToolBar title={library.name} subtitle={library.version} />
            <Wrapper>
              <Content>
                <h2>Library projects</h2>
                <div>
                  <Input
                    autoFocus
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
                  total={library.dependents.edges.length}
                />
              </Sidebar>
            </Wrapper>
          </>
        )
      }}
    </AuthenticatedQuery>
  )
}

export default memo(NodeLibraryDetails)
