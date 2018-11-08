import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, Switch } from 'react-router-dom'
import { space, SpaceProps } from 'styled-system'

const StyledNav = styled.section`
  background: white;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`

const Container = styled.div`
  width: 1140px;
`

const Title = styled<SpaceProps, 'h1'>('h1')`
  font-family: "Microsoft Sans Serif";
  font-size: 26px;
  line-height: 29px;
  margin: 40px 0 20px;
  ${space};
`

const Anchor = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  margin-bottom: 40px;
`

const StyledNavLink = styled(NavLink)`
  padding: 20px 0;
  margin-right: 40px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;
`

const Nav = styled.div`
  display: flex;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

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
`

const activeStyle = { borderBottom: '2px solid black' }


const SubNav = ({ projects, libraries }: SubNavProps) => (
  <StyledNav>
    <Container>
      <Switch>
        <Route
          path="/:department/:category/:name"
          render={({
            match: {
              params: { category, name },
            },
          }) => {
            const decodedName = decodeURIComponent(name)
            const url = category === 'project' ? projects[name].url : libraries[decodedName].url
            return (
              <div>
                <Title mb="10px">{decodedName}</Title>
                <Anchor href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </Anchor>
              </div>
            )
          }}
        />
        <Route path="/" render={() => <Title>Dashboard</Title>} />
      </Switch>
      <Route
        exact
        path="/:department/:category"
        render={({
          match: {
            params: { department },
          },
        }) => (
          <Wrapper>
            <Nav>
              <StyledNavLink
                to={`/${department}/libraries`}
                activeStyle={activeStyle}
              >
                Libraries
              </StyledNavLink>
              <StyledNavLink
                to={`/${department}/projects`}
                activeStyle={activeStyle}
              >
                Projects
              </StyledNavLink>
            </Nav>
            <Input placeholder="Search Libraries" />
          </Wrapper>
        )}
      />
    </Container>
  </StyledNav>
)

export interface SubNavProps {
  projects: any
  libraries: any
}

export default React.memo(SubNav)
