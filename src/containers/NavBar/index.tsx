import React, { useCallback } from 'react'
import { match } from 'react-router-dom'
import { Location, LocationDescriptor } from 'history'
import { Container, StyledLogoLink, StyledNav, StyledNavLink } from './styled'

export interface NavBarLinkProps {
  to: LocationDescriptor
  children?: React.ReactNode
}
export interface NavBarProps {
  logo?: React.ReactNode
  children?: React.ReactNode
}
export const NavBarLink = (props: NavBarLinkProps) => {
  const handleIsActive = useCallback((_: match, location: Location) => {
    const path = typeof props.to === 'string' ? props.to : props.to.pathname!
    const [root, basePath] = path.split('/')
    return location.pathname.startsWith(`${root}/${basePath}`)
  }, [])
  return (
    <StyledNavLink
      to={props.to}
      isActive={handleIsActive}
      activeClassName='active'
      children={props.children}
    />
  )
}

const NavBar = (props: NavBarProps) => (
  <StyledNav>
    {props.logo && <StyledLogoLink to='/'>{props.logo}</StyledLogoLink>}
    <Container>{props.children}</Container>
  </StyledNav>
)

export default React.memo(NavBar)
