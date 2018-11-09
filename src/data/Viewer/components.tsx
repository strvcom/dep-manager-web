import * as React from 'react'
import { Query, QueryProps } from 'react-apollo'
import {Omit} from 'utility-types'

import {VIEWER_QUERY, ViewerResponse} from './queries'

export const QueryViewer = (props: Omit<QueryProps<ViewerResponse>, 'query'>) => (
  <Query {...props} query={VIEWER_QUERY}/>
)
