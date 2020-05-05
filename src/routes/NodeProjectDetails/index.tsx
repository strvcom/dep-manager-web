import React, { memo, useState, FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { prop } from 'ramda'

import { useQuery } from '~api/client'
import ToolBar from '~app/components/ToolBar'
import Anchor from '~app/components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '~app/components/ActualityWidget'
import RecentUpdates from '~app/components/RecentUpdates'
import { Body } from '~app/components/Typography'
import Loading from '~app/components/Loading'
import NodeProjectDependenciesTable from '~app/components/NodeProjectDependenciesTable'
import { BidaDepartment } from '~app/config/types'
import { getRecentlyUpdated } from '../Dashboard/helpers'
import document from './query.gql'

export interface IProps extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeProjectDetails: FunctionComponent<IProps> = ({ match, department }: IProps) => {
  const name = decodeURIComponent(match.params.id)
  const [search, setSearch] = useState('')
  const cacheKey = department + name + search
  const { data, loading, error } = useQuery('PROJECT_QUERY', document, { variables: { name } })

  if (error) throw error
  if (loading) return <Loading />
  if (!data) return null

  const { project } = data
  const dependencies = project?.npmPackage?.dependencies || []

  const outdated = dependencies.filter(({ outdateStatus }) => outdateStatus === 'MAJOR')
  const recentLibraries = getRecentlyUpdated(dependencies).map(prop('package')) as any
  const filtered = dependencies.filter((dependency) => dependency.package.name.includes(search))

  return (
    <>
      <ToolBar
        title={project.name}
        subtitle={
          <Anchor target="__blank" href={project.url}>
            {project.url}
          </Anchor>
        }
      />
      <Wrapper>
        <Content>
          <Body>Project libraries</Body>
          <div>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for libraries"
            />
          </div>
          <NodeProjectDependenciesTable
            dependencies={filtered}
            department={department}
            cacheKey={cacheKey}
          />
        </Content>
        <Sidebar>
          <RecentUpdates department={department} libraries={recentLibraries} />

          <ActualityWidget
            title="Libraries Actuality"
            mt={20}
            outdated={outdated.length}
            total={dependencies.length}
          />
        </Sidebar>
      </Wrapper>
    </>
  )
}

export default memo(NodeProjectDetails)
