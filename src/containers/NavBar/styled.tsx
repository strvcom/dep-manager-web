import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyledNav = styled.nav`
  position: relative;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
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
`

export const StyledLogoLink = styled(NavLink)`
  position: absolute;
  left: 40px;
  align-self: center;
`
