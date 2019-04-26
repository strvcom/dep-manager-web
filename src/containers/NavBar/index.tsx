import React, { useCallback, FunctionComponent } from 'react'
import { match } from 'react-router-dom'
import { Location as LocationType, LocationDescriptor } from 'history'
import { Container, StyledLogoLink, StyledNav, StyledNavLink } from './styled'

export interface INavBarLinkProps {
  to: LocationDescriptor
  children?: React.ReactNode
}
export interface INavBarProps {
  logo?: React.ReactNode
  children?: React.ReactNode
}

export const NavBarLink: FunctionComponent<INavBarLinkProps> = (
  props: INavBarLinkProps
): JSX.Element => {
  const handleIsActive = useCallback((_: match, { pathname }: LocationType) => {
    const path = typeof props.to === 'string' ? props.to : props.to.pathname

    if (!path) {
      return false
    }

    const [root, basePath] = path.split('/')

    return pathname.startsWith(`${root}/${basePath}`)
  }, [])

  return (
    <StyledNavLink
      to={props.to}
      isActive={handleIsActive}
      activeClassName="active"
      children={props.children}
    />
  )
}

const NavBar: FunctionComponent<INavBarLinkProps> = (
  props: INavBarProps
): JSX.Element => (
  <StyledNav>
    {props.logo && <StyledLogoLink to="/">{props.logo}</StyledLogoLink>}
    <Container>{props.children}</Container>
  </StyledNav>
)

export default React.memo(NavBar)
