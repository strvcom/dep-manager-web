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
import { Category } from '../../config/types'
// import Anchor from '../../components/Anchor'
import { Department } from '../../data/__generated-types'

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
  department: Department
  category: Category
}>

export const DashboardToolBar = React.memo<DashboardToolBarProps>(props => {
  const { category, department } = props.match.params
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

export const ProjectToolBar = React.memo(
  (props: RouteComponentProps<{ name: string }>) => {
    return null
    // return (
    //   <ToolBar
    //     title={project.name}
    //     subtitle={
    //       <Anchor href={project.url} target='__blank'>
    //         {project.url}
    //       </Anchor>
    //     }
    //   />
    // )
  }
)

export const LibraryToolBar = React.memo(
  (props: RouteComponentProps<{ name: string }>) => {
    return null
  }
)
