import React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import * as routes from '../routes'
import toBidaDepartment from '../../utils/toDepartment'
import { BidaDepartment } from '../../data/__generated-types'
import InitializeData from '../../containers/InitializeData'
import Loading from '../../components/Loading'

const Dashboard = React.lazy(() =>
  import(/* webpackChunkName: 'Dashboard' */ '../Dashboard')
)

const NodeProjectDetails = React.lazy(() =>
  import(/* webpackChunkName: 'NodeProjectDetails' */ '../NodeProjectDetails')
)

const NodeLibraryDetails = React.lazy(() =>
  import(/* webpackChunkName: 'NodeLibraryDetails' */ '../NodeLibraryDetails')
)

export type DepartmentPageProps = RouteComponentProps<{
  department: string
}>

const DepartmentPage = React.memo((props: DepartmentPageProps) => {
  const department = toBidaDepartment(props.match!.params.department)
  return (
    <InitializeData loading={<Loading />} department={department}>
      <Switch>
        <Route
          path={routes.nodeProjectDetails}
          render={useNodeProjectDetails(department)}
        />
        />
        <Route
          path={routes.nodeLibraryDetails}
          render={useNodeLibraryDetails(department)}
        />
        <Route path={routes.dashboard} component={Dashboard} />
      </Switch>
    </InitializeData>
  )
})

const useNodeProjectDetails = (department: BidaDepartment) =>
  React.useCallback(
    (routeProps: RouteComponentProps<{ id: string }>) => (
      <NodeProjectDetails {...routeProps} department={department} />
    ),
    [department]
  )
const useNodeLibraryDetails = (department: BidaDepartment) =>
  React.useCallback(
    (routeProps: RouteComponentProps<{ id: string }>) => (
      <NodeLibraryDetails {...routeProps} department={department} />
    ),
    [department]
  )

export default DepartmentPage