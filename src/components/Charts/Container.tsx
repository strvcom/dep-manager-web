import React from 'react'
import styled from 'styled-components'
import {
  space,
  width,
  height,
  WidthProps,
  HeightProps,
  SpaceProps,
} from 'styled-system'
import { typography } from '../../styles/themes/mixins'

export type WidgetContainerProps = WidthProps &
  HeightProps &
  SpaceProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const WidgetContainer = styled.div<WidgetContainerProps>`
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
