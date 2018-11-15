import React from 'react'
import { NavLinkProps, withRouter, RouteComponentProps } from 'react-router-dom'
import {
  Nav,
  StyledNavBar,
  StyledNavLink,
  NavBarContainer,
  Title,
  Subtitle,
  Wrapper
} from './styled'

const activeStyle = { borderBottom: '2px solid black' }

export interface NavBarProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  links?: React.ReactNode
  children?: React.ReactNode
}

export const ToolBarLink = withRouter(
  React.memo((props: NavLinkProps & RouteComponentProps) => {
    const { history, location, staticContext, match, ...rest } = props
    return <StyledNavLink {...rest} activeStyle={activeStyle} />
  })
)

const ToolBar = React.memo((props: NavBarProps) => (
  <StyledNavBar>
    <NavBarContainer>
      <Title mb='10px'>{props.title}</Title>
      {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
      <Wrapper>
        {props.links && <Nav>{props.links}</Nav>}
        {props.children}
      </Wrapper>
    </NavBarContainer>
  </StyledNavBar>
))
export default ToolBar
