import styled from '../../styles/styled'
import React from 'react'
import { space, SpaceProps } from 'styled-system'
import { typography } from '../../styles/themes/mixins'

export const StyledNavBar = styled.section`
  background: ${props => props.theme.backgroundColor};
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  ${typography.body}
`

export const NavBarContainer = styled.div`
  width: 1140px;
`

interface TitleProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    SpaceProps {}

export const Title = styled.h1<TitleProps>`
  ${typography.title}
  margin: 40px 0 20px;
  ${space};
`

export const Subtitle = styled.div`
  margin-bottom: 40px;
`

export const Nav = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
