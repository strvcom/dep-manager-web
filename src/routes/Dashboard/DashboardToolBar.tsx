import React, { Fragment, memo } from 'react'
import ToolBar, { ToolBarLink } from '../../components/ToolBar'
import { Input } from './styled'

interface DashboardToolBarProps {
  department: string
  category: string
}

const DashboardToolBar = ({ department, category }: DashboardToolBarProps) => (
  <ToolBar
    title='Dashboard'
    links={
      <Fragment>
        <ToolBarLink to={`/${department}/libraries`}>Libraries</ToolBarLink>
        <ToolBarLink to={`/${department}/projects`}>Projects</ToolBarLink>
      </Fragment>
    }
    children={<Input placeholder={`Search ${category}`} />}
  />
)

export default memo(DashboardToolBar)
