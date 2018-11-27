import styled from 'styled-components'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { space, SpaceProps } from 'styled-system'

export const StyledDashboard = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
`

export const WidgetContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`

export const StyledNavBar = styled.section`
  background: white;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`

export const NavBarContainer = styled.div`
  width: 1140px;
`

export interface TitleProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    SpaceProps {}
const TitleCmp = ({
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  ...props
}: TitleProps) => <h1 {...props} />
export const Title = styled(TitleCmp)`
  font-family: 'Microsoft Sans Serif';
  font-size: 26px;
  line-height: 29px;
  margin: 40px 0 20px;
  ${space};
`

export const Subtitle = styled.div`
  margin-bottom: 40px;
`

export const StyledNavLink = styled(NavLink)`
  padding: 20px 0;
  margin-right: 40px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;
`

export const Nav = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`

export const Input = styled.input`
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

export interface StatusProp
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  count: number
}

const StatusCmp = ({ count, ...props }: StatusProp) => <span {...props} />
export const Status = styled(StatusCmp)`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 2px;

  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  ${({ count }) => !count && 'text-decoration: line-through'};
`

export const Outdated = styled(Status)`
  ${({ count }) =>
    count &&
    `
    background-color: #ffd1d9;
    color: #ef0d33;
  `};
`

export const Alerts = styled(Status)`
  ${({ count }) =>
    count &&
    `
    background-color: #ffefbb;
    color: #c2950b;
  `};
`
