import React, { memo, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { GT } from '~api/client'

import DashboardToolBar from './DashboardToolBar'
import { DashboardContent } from './DashboardContent'
import { StyledMain } from './styled'

const Dashboard: React.FC<RouteComponentProps<{
  department: string
  category: string
}>> = ({ match }) => {
  const [search, setSearch] = useState('')
  const department = match.params.department.toUpperCase() as GT.BidaDepartment

  return (
    <>
      <DashboardToolBar
        department={department}
        category={match.params.category}
        search={search}
        setSearch={setSearch}
      />

      <StyledMain>
        <DashboardContent department={department} search={search} />
      </StyledMain>
    </>
  )
}

export default memo(Dashboard)
