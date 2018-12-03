import React from 'react'
import styled from 'styled-components'
import {
  space,
  width,
  height,
  WidthProps,
  HeightProps,
  SpaceProps
} from 'styled-system'

export type WidgetContainerProps = WidthProps &
  HeightProps &
  SpaceProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const WidgetContainerCmp = ({
  // tslint:disable-next-line:no-shadowed-variable
  width,
  // tslint:disable-next-line:no-shadowed-variable
  height,
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
}: WidgetContainerProps) => <div {...props} />

const WidgetContainer = styled(WidgetContainerCmp)`
  display: flex;
  flex-direction: column;
  padding: 25px 30px;
  background: white;
  height: 180px;
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  ${space};
  ${width};
  ${height};
`

export const WidgetTitle = styled.h1`
  font-family: 'Maison Neue';
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`

export default WidgetContainer
