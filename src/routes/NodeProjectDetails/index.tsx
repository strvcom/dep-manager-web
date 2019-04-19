import React, { Fragment, memo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { prop, propEq } from 'ramda'

import ToolBar from '../../components/ToolBar'
import Anchor from '../../components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import RecentUpdates from '../Dashboard/RecentUpdates'
import { Body } from '../../components/Typography'
import Loading from '../../components/Loading'
import NodeProjectDependenciesTable from '../../containers/NodeProjectDependenciesTable'
import { BidaDepartment } from '../../config/types'

import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import { getRecentlyUpdated } from '../Dashboard/helpers'

import { PROJECT_QUERY } from './query.gql'

export interface Props extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeProjectDetails = ({ match, department }: Props) => {
  const name = decodeURIComponent(match!.params.id)
  const [search, setSearch] = useState('')

  return (
    <AuthenticatedQuery query={PROJECT_QUERY} variables={{ name }}>
      {({ data, loading, error }: any) => {
        if (error) throw error
        if (loading) return <Loading />

        const { project } = data

        const dependencies = project.npmPackage
          ? project.npmPackage.dependencies
          : []

        const outdated = dependencies.filter(propEq('outdateStatus', 'MAJOR'))

        const recentLibraries = getRecentlyUpdated(dependencies).map(
          prop('package')
        )

        const filtered = dependencies.filter((dependency: any) =>
          dependency.package.name.includes(search)
        )

        return (
          <Fragment>
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
                  <Input
                    autoFocus
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder='Search for libraries'
                  />
                </div>
                <NodeProjectDependenciesTable
                  dependencies={filtered}
                  department={department}
                  cacheKey={search}
                />
              </Content>
              <Sidebar>
                <RecentUpdates libraries={recentLibraries} />

                <ActualityWidget
                  title='Libraries Actuality'
                  mt={20}
                  outdated={outdated.length}
                  total={dependencies.length}
                />
              </Sidebar>
            </Wrapper>
          </Fragment>
        )
      }}
    </AuthenticatedQuery>
  )
}

export default memo(NodeProjectDetails)
