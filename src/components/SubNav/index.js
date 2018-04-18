// @flow
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledNav = styled.nav`
  background: white;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1140px;
  heigth: 140px;
`;

const Title = styled.h1`
  font-family: "Microsoft Sans Serif";
  font-size: 26px;
  line-height: 29px;
  margin: 40px 0 20px;
`;

const StyledNavLink = styled(NavLink)`
  padding: 20px 0;
  margin-right: 40px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;
`;

const Nav = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const Input = styled.input`
  padding: 12px 15px;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 16px;

  &::placeholder {
    opacity: 0.25;
  }
`;

const activeStyle = { borderBottom: "2px solid black" };

type Props = {
  match: {
    url: string
  }
};

const SubNav = ({ match }: Props) => {
  const showNav =
    !match.url.startsWith("/library") && !match.url.startsWith("/project");
  return (
    <StyledNav>
      <Container>
        <Title>Dashboard</Title>
        {showNav && (
          <Wrapper>
            <Nav>
              <StyledNavLink
                to={`${match.url}/libraries`}
                activeStyle={activeStyle}
              >
                Libraries
              </StyledNavLink>
              <StyledNavLink
                to={`${match.url}/projects`}
                activeStyle={activeStyle}
              >
                Projects
              </StyledNavLink>
            </Nav>
            <Input placeholder="Search Libraries" />
          </Wrapper>
        )}
      </Container>
    </StyledNav>
  );
};

export default SubNav;
