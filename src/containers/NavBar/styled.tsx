import styled from '../../styles/styled'
import { NavLink } from 'react-router-dom'
import { typography } from '../../styles/themes/mixins'

export const StyledNav = styled.nav`
  position: relative;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryColorAccent};
  display: flex;
  justify-content: center;
  ${typography.body}
`

export const Container = styled.div`
  display: flex;
  width: 1140px;
  height: 70px;
`

export const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 60px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;
  opacity: 0.75;
  &.active {
    border-bottom: 2px solid ${props => props.theme.secondaryColor};
    opacity: 1;
  }
`

export const StyledLogoLink = styled(NavLink)`
  position: absolute;
  left: 40px;
  align-self: center;
`
