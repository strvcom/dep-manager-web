import * as React from 'react'
import { Query, QueryProps } from 'react-apollo'
import {Omit} from 'utility-types'

import {REPOSITORIES_QUERY} from './queries'

export const QueryRepositories = (props: Omit<QueryProps, 'query'>) => (
  <Query {...props} query={REPOSITORIES_QUERY}/>
)
