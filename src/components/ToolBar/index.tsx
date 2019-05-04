import React from 'react'

import { Nav, StyledNavBar, NavBarContainer, Title, Subtitle, Wrapper } from './styled'

interface IToolBarProps {
  title?: React.ReactNode
  subtitle?: React.ReactNode
  links?: React.ReactNode
  children?: React.ReactNode
}

const ToolBar = ({ title, subtitle, links, children }: IToolBarProps) => (
  <StyledNavBar>
    <NavBarContainer>
      {title && <Title mb="10px">{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}

      <Wrapper>
        {links && <Nav>{links}</Nav>}
        {children}
      </Wrapper>
    </NavBarContainer>
  </StyledNavBar>
)

export { default as ToolBarLink } from './ToolBarLink'

export default React.memo(ToolBar)
