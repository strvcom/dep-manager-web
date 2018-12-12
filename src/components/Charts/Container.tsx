import React from 'react'
import styled from '../../styles/styled'
import {
  space,
  width,
  height,
  WidthProps,
  HeightProps,
  SpaceProps
} from 'styled-system'
import { typography } from '../../styles/themes/mixins'

export type WidgetContainerProps = WidthProps &
  HeightProps &
  SpaceProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const WidgetContainer = styled(
  ({
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
)`
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
  ${typography.body}
`

export default WidgetContainer
