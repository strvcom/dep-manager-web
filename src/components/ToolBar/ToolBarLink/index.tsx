import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const ToolBarLink = styled(NavLink).attrs({ activeClassName: 'active' })`
  padding: 20px 0;
  margin-right: 40px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;

  &.active {
    border-bottom: 2px solid black;
  }
`

export default ToolBarLink
