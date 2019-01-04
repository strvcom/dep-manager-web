import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { BidaDepartment } from '../data/__generated-types'

const NodeProjectDetails = React.lazy(() =>
  import(/* webpackChunkName: 'NodeProjectDetails' */ './NodeProjectDetails')
)

const BackendProjectDetails = (props: RouteComponentProps<{ id: string }>) => (
  <NodeProjectDetails {...props} department={BidaDepartment.BACKEND} />
)

export default React.memo(BackendProjectDetails)
