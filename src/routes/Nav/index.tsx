import React from 'react'
import { match } from 'react-router-dom'
import { Location } from 'history'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Container, StyledLogoLink, StyledNav, StyledNavLink } from './styled'
import * as routes from '../routes'

const activeStyle = { borderBottom: '2px solid white' }

// tslint:disable-next-line:no-shadowed-variable
const startsWith = (url: string) => (match: match, location: Location) =>
  location.pathname.startsWith(url)

const Nav = () => (
  <StyledNav>
    <StyledLogoLink to={routes.root}>
      <Logo height='16' />
    </StyledLogoLink>
    <Container>
      <StyledNavLink
        to={routes.frontendLibraries}
        isActive={startsWith(routes.frontend)}
        activeStyle={activeStyle}
      >
        Frontend
      </StyledNavLink>
      <StyledNavLink
        to={routes.backendLibraries}
        isActive={startsWith(routes.backend)}
        activeStyle={activeStyle}
      >
        Backend
      </StyledNavLink>
      <StyledNavLink
        to={routes.iosLibraries}
        isActive={startsWith(routes.ios)}
        activeStyle={activeStyle}
      >
        iOS
      </StyledNavLink>
      <StyledNavLink
        to={routes.androidLibraries}
        isActive={startsWith(routes.android)}
        activeStyle={activeStyle}
      >
        Android
      </StyledNavLink>
    </Container>
  </StyledNav>
)

export default Nav
