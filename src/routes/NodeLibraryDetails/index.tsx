import React, { memo, Fragment } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import {
  __,
  curry,
  pipe,
  path,
  pathOr,
  any,
  both,
  prop,
  propEq,
  equals
} from 'ramda'

import ToolBar from '../../components/ToolBar'
import { Wrapper, Content, Sidebar, Input } from './styled'
import ActualityWidget from '../../containers/LibrariesActualityWidget'
import NodeLibraryDependentsTable from '../../containers/NodeLibraryDependentsTable'
import { BidaDepartment } from '../../data/__generated-types'
import Loading from '../../components/Loading'
import { versionDistance } from '../../utils/version-diff'

import AuthenticatedQuery from '../../containers/AuthenticatedQuery'

const NODE_LIBRARY_QUERY = gql`
  query NODE_LIBRARY_QUERY($name: String!, $department: BidaDepartment!) {
    library: npmPackage(name: $name) {
      id
      name
      version

      dependents(first: 100, department: $department) {
        edges {
          node {
            ... on Dependent {
              version
              repository {
                name
              }
            }
          }
        }
      }
    }
  }
`

export interface Props extends RouteComponentProps<{ id: string }> {
  department: BidaDepartment
}

const isOutdatedEdge = (version: string) =>
  pipe(
    path(['node', 'version']),
    // @ts-ignore
    versionDistance(version),
    equals('MAJOR')
  )

const NodeLibraryDetails = ({ match, department }: Props) => {
  const { id: name } = match!.params

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
          isOutdatedEdge(library.version)
        )

        return (
          <Fragment>
            <ToolBar title={library.name} subtitle={library.version} />
            <Wrapper>
              <Content>
                <h2>Library projects</h2>
                <div>
                  <Input placeholder='Search for projects' />
                </div>
                <NodeLibraryDependentsTable
                  libraryVersion={library.version}
                  dependents={library.dependents.edges}
                  department={department}
                />
              </Content>

              <Sidebar>
                <ActualityWidget
                  title='Projects Actuality'
                  mt={20}
                  outdated={outdated.length}
                  total={library.dependents.edges.length}
                />
              </Sidebar>
            </Wrapper>
          </Fragment>
        )
      }}
    </AuthenticatedQuery>
  )
}

export default memo(NodeLibraryDetails)
