import React, { memo, FunctionComponent } from 'react'
import ToolBar, { ToolBarLink } from '../../components/ToolBar'
import { Input } from './styled'

interface IProps {
  department: string
  category: string
  search: string
  setSearch: (input: string) => void
}

const DashboardToolBar: FunctionComponent<IProps> = ({
  department,
  category,
  search,
  setSearch,
}: IProps) => (
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
