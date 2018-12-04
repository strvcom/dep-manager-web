import React from 'react'
import { NavLinkProps, withRouter, RouteComponentProps } from 'react-router-dom'
import { StyledNavLink } from './styled'

const activeStyle = { borderBottom: '2px solid black' }

const ToolBarLink = (props: NavLinkProps & RouteComponentProps) => {
  const { history, location, staticContext, match, ...rest } = props
  return <StyledNavLink {...rest} activeStyle={activeStyle} />
}

export default withRouter(React.memo(ToolBarLink))
