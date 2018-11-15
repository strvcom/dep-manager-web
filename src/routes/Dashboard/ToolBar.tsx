import React from 'react'
import { NavLinkProps, withRouter, RouteComponentProps } from 'react-router-dom'
import {
  Nav,
  StyledNavBar,
  StyledNavLink,
  NavBarContainer,
  Title,
  Subtitle,
  Wrapper,
  Input
} from './styled'
import * as routes from '../routes'
import { useProject } from '../../data/Repository'
import Anchor from '../../components/Anchor'

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

export type DashboardToolBarProps = RouteComponentProps<{
  department: routes.Department
  category: routes.Category
}>

export const DashboardToolBar = React.memo<DashboardToolBarProps>(props => {
  const {
    match: {
      params: { category, department }
    }
  } = props
  return (
    <ToolBar
      title='Dashboard'
      links={
        <React.Fragment>
          <ToolBarLink to={`/${department}/libraries`}>Libraries</ToolBarLink>
          <ToolBarLink to={`/${department}/projects`}>Projects</ToolBarLink>
        </React.Fragment>
      }
      children={<Input placeholder={`Search ${category}`} />}
    />
  )
})

export type DashboardNameToolBarProps = RouteComponentProps<{
  department: routes.Department
  category: routes.Category
  name: string
}>
export const DashboardNameToolBar = React.memo<DashboardNameToolBarProps>(
  props => {
    const {
      match: {
        params: { name }
      }
    } = props
    const { data: project } = useProject(decodeURIComponent(name))
    if (!project) return null
    return (
      <ToolBar
        title={project.name}
        subtitle={
          <Anchor href={project.url} target='__blank'>
            {project.url}
          </Anchor>
        }
      />
    )
  }
)
