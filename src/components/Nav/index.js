// @flow
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/Icons/Logo";

const StyledNav = styled.nav`
  position: relative;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  width: 1140px;
  height: 70px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: 60px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledLogoLink = styled(NavLink)`
  position: absolute;
  left: 40px;
  align-self: center;
`;

const activeStyle = { borderBottom: "2px solid white" };

const startsWith = url => (__, location: Location) =>
  location.pathname.startsWith(url);

const Nav = () => (
  <StyledNav>
    <StyledLogoLink to="/">
      <Logo height="16" />
    </StyledLogoLink>
    <Container>
      <StyledNavLink
        to="/frontend/libraries"
        isActive={startsWith("/frontend")}
        activeStyle={activeStyle}
      >
        Frontend
      </StyledNavLink>
      <StyledNavLink
        to="/backend/libraries"
        isActive={startsWith("/backend")}
        activeStyle={activeStyle}
      >
        Backend
      </StyledNavLink>
      <StyledNavLink
        to="/ios/libraries"
        isActive={startsWith("/ios")}
        activeStyle={activeStyle}
      >
        iOS
      </StyledNavLink>
      <StyledNavLink
        to="/android/libraries"
        isActive={startsWith("/android")}
        activeStyle={activeStyle}
      >
        Android
      </StyledNavLink>
    </Container>
  </StyledNav>
);

export default Nav;
