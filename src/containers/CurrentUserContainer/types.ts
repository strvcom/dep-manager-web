import { ReactNode } from 'react'
import { QueryResult } from 'react-apollo'

export interface CurrentUserContainerProps {
  children: (result: { user: any; loading: boolean }) => ReactNode
}

interface Data {
  user: { id: string; name: string } | undefined
}

export interface Result extends QueryResult {
  data: Data
  loading: boolean
}
