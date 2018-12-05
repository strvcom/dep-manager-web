import React from 'react'
import {
  Nav,
  StyledNavBar,
  NavBarContainer,
  Title,
  Subtitle,
  Wrapper
} from './styled'

export interface ToolBarProps {
  title: React.ReactNode
  subtitle?: React.ReactNode
  links?: React.ReactNode
  children?: React.ReactNode
}

const ToolBar = (props: ToolBarProps) => (
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
)

export { default as ToolBarLink } from './ToolBarLink'
export default React.memo(ToolBar)
