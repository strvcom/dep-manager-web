import React, { memo, useState, FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { useQuery, GT } from '~api/client'
import ToolBar from '~app/components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '~app/components/ActualityWidget'
import NodeLibraryDependentsTable from '~app/components/NodeLibraryDependentsTable'
import { BidaDepartment } from '~app/config/types'
import Loading from '~app/components/Loading'
import document from './query.gql'

export interface IProps extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeLibraryDetails: FunctionComponent<IProps> = ({ match, department }: IProps) => {
  const name = decodeURIComponent(match.params.id)
  const [search, setSearch] = useState('')
  const cacheKey = department + name + search

  const { data, loading, error } = useQuery('NODE_LIBRARY_QUERY', document, {
    variables: { name, department },
  })

  if (error) throw error
  if (loading) return <Loading />
  if (!data || !data.library) return null

  const { library } = data

  const dependents = (library.dependents.edges || []).map((edge) => edge!.node as GT.Dependent)
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
              onChange={(e) => setSearch(e.target.value)}
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
}

export default memo(NodeLibraryDetails)
