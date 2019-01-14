import React from 'react'
import usePromise from '../hooks/promise-hook'
import { runInitializers } from '../utils/apollo-utils'
import projectsInitializers from '../config/initializers/projectsInitializers'
import { BidaDepartment } from '../data/__generated-types'

export interface InitializeDataProps {
  department: BidaDepartment
  children: React.ReactElement<any> | null
  loading?: React.ReactElement<any> | null
}

const InitializeData = React.memo((props: InitializeDataProps) => {
  const { department, children, loading = null } = props
  const { pending } = usePromise(
    () => runInitializers(projectsInitializers(department)),
    [department]
  )
  if (pending) return loading
  return children
})

export default InitializeData
