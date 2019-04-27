import React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import * as routes from '../routes'
import toBidaDepartment from '../../utils/toDepartment'
import { BidaDepartment } from '../../config/types'

type RouteRenderer<P> = (props: RouteComponentProps<P>) => React.ReactNode

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: 'Dashboard' */ '../Dashboard')
)

const NodeProjectDetails = React.lazy(() =>
  import(/* webpackChunkName: 'NodeProjectDetails' */ '../NodeProjectDetails')
)

const NodeLibraryDetails = React.lazy(() =>
  import(/* webpackChunkName: 'NodeLibraryDetails' */ '../NodeLibraryDetails')
)

const useNodeProjectDetails = (
  department: BidaDepartment
): RouteRenderer<{ id: string }> =>
  React.useCallback(
    (routeProps: RouteComponentProps<{ id: string }>) => (
      <NodeProjectDetails {...routeProps} department={department} />
    ),
    [department]
  )

const useNodeLibraryDetails = (
  department: BidaDepartment
): RouteRenderer<{ id: string }> =>
  React.useCallback(
    (routeProps: RouteComponentProps<{ id: string }>) => (
      <NodeLibraryDetails {...routeProps} department={department} />
    ),
    [department]
  )

type DepartmentPageProps = RouteComponentProps<{
  department: string
}>

const DepartmentPage = React.memo((props: DepartmentPageProps) => {
  const department = toBidaDepartment(props.match.params.department)
  const renderNodeProjectDetails = useNodeProjectDetails(department)
  const renderNodeLibraryDetails = useNodeLibraryDetails(department)

  return (
    <Switch>
      <Route
        path={routes.nodeProjectDetails}
        render={renderNodeProjectDetails}
      />
      <Route
        path={routes.nodeLibraryDetails}
        render={renderNodeLibraryDetails}
      />
      <Route path={routes.dashboard} component={Dashboard} />
    </Switch>
  )
})

export default DepartmentPage
