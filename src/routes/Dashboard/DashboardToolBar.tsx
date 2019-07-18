import React, { memo } from 'react'
import ToolBar, { ToolBarLink } from '../../components/ToolBar'
import { Input } from './styled'

interface DashboardToolBarProps {
  department: string
  category: string
  search: string
  setSearch: (input: string) => void
}

const DashboardToolBar = ({ department, category, search, setSearch }: DashboardToolBarProps) => (
  <ToolBar
    title="Dashboard"
    links={
      <>
        <ToolBarLink to={`/${department}/libraries`}>Libraries</ToolBarLink>
        <ToolBarLink to={`/${department}/projects`}>Projects</ToolBarLink>
      </>
    }
    children={
      <Input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder={`Search ${category}`}
      />
    }
  />
)

export default memo(DashboardToolBar)
