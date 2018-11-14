import React from 'react'
import styled from 'styled-components'
import { NavLink, Route, RouteComponentProps, Switch } from 'react-router-dom'
import { useQuery } from '../../utils/hooks'
import { REPOSITORY_URL_QUERY } from '../../data/Repository'
import { RepositorySearch, RepositorySearchVariables } from '../../data/types'
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
  font-family: 'Microsoft Sans Serif';
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

const SubNavProjectTitle = React.memo(
  (
    props: RouteComponentProps<{
    department: string
    name: string
    category: string
    }>
  ) => {
    const {
      match: {
        params: { name }
      }
    } = props
    const { data, loading } = useQuery<
    RepositorySearch,
    RepositorySearchVariables
    >({
      query: REPOSITORY_URL_QUERY,
      variables: { name },
      fetchPolicy: 'cache-only'
    })
    if (loading) return null
    if (!data || !data.repository) return null
    const {
      repository: { url }
    } = data
    return (
      <React.Fragment>
        <Title mb='10px'>{name}</Title>
        <Anchor href={url} target='_blank' rel='noopener noreferrer'>
          {url}
        </Anchor>
      </React.Fragment>
    )
  }
)

const SubNav = () => {
  return (
    <StyledNav>
      <Container>
        <Switch>
          <Route
            path='/:department/projects/:name'
            component={SubNavProjectTitle}
          />
          <Route path='/' render={() => <Title mb='10px'>Dashboard</Title>} />
        </Switch>
        <Route
          exact
          path='/:department/:category(projects|libraries)'
          render={(
            props: RouteComponentProps<{ department: string; category: string }>
          ) => (
            <Wrapper>
              <Nav>
                <StyledNavLink
                  to={`/${props.match.params.department}/libraries`}
                  activeStyle={activeStyle}
                >
                  Libraries
                </StyledNavLink>
                <StyledNavLink
                  to={`/${props.match.params.department}/projects`}
                  activeStyle={activeStyle}
                >
                  Projects
                </StyledNavLink>
              </Nav>
              <Input placeholder='Search Libraries' />
            </Wrapper>
          )}
        />
      </Container>
    </StyledNav>
  )
}

export default SubNav
