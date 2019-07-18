import React, { memo, useState, FunctionComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { prop, pathOr } from 'ramda'

import ToolBar from '../../components/ToolBar'
import Anchor from '../../components/Anchor'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../components/ActualityWidget'
import RecentUpdates from '../../components/RecentUpdates'
import { Body } from '../../components/Typography'
import Loading from '../../components/Loading'
import NodeProjectDependenciesTable from '../../components/NodeProjectDependenciesTable'
import { BidaDepartment } from '../../config/types'

import AuthenticatedQuery from '../../containers/AuthenticatedQuery'
import { getRecentlyUpdated } from '../Dashboard/helpers'

import PROJECT_QUERY from './query.gql'

import {
  PROJECT_QUERY as IData,
  PROJECT_QUERYVariables as IVariables,
  PROJECT_QUERY_project_npmPackage_dependencies as Dependency,
  PROJECT_QUERY_project_npmPackage_dependencies_package as IPackage,
  PROJECT_QUERY_project as Project,
} from './graphql-types/PROJECT_QUERY'

const getDependencies: (project: Project) => Dependency[] = pathOr<Dependency[]>(
  [],
  ['npmPackage', 'dependencies']
)

export interface IProps extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const NodeProjectDetails: FunctionComponent<IProps> = ({ match, department }: IProps) => {
  const name = decodeURIComponent(match.params.id)
  const [search, setSearch] = useState('')

  const cacheKey = department + name + search

  return (
    <AuthenticatedQuery<IData, IVariables>
      query={PROJECT_QUERY}
      variables={{ name }}
      children={({ data, loading, error }) => {
        if (error) throw error
        if (loading) return <Loading />
        if (!data) return null

        const { project } = data
        const dependencies = getDependencies(project)

        const outdated = dependencies.filter(({ outdateStatus }) => outdateStatus === 'MAJOR')
        const recentLibraries = getRecentlyUpdated(dependencies).map(prop('package')) as IPackage[]

        const filtered = dependencies.filter((dependency: Dependency) =>
          dependency.package.name.includes(search)
        )

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
                    onChange={e => setSearch(e.target.value)}
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
                <RecentUpdates libraries={recentLibraries} />

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
      }}
    />
  )
}

export default memo(NodeProjectDetails)
