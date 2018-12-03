import React from 'react'
import styled, { keyframes } from 'styled-components'

const grow = (maxWidth: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${maxWidth}%;
  }
`

export interface BarProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  fill: number
}
const BarCmp = ({ fill, ...props }: BarProps) => <div {...props} />
const Bar = styled(BarCmp)`
  position: relative;
  margin: 48px 0 24px;
  height: 4px;
  background-color: rgba(17, 21, 23, 0.15);
  &::after {
    content: '';
    display: block;
    position: absolute;
    background-color: #111517;
    top: 0;
    left: 0;
    height: 4px;
    animation: ${({ fill }) => grow(fill || 0)} 1s ease forwards;
  }
`

export default Bar
