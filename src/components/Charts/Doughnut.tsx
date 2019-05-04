import React from 'react'
import styled, { keyframes, Keyframes } from 'styled-components'

const draw = (percent: number): Keyframes => keyframes`
  to {
    stroke-dasharray: ${percent} ${100 - percent};
    stroke-dashoffset: ${25 + percent};
  }
`

interface ICircleProps extends React.SVGProps<SVGCircleElement> {
  percent: number
}

export const Circle = styled.circle`
  animation: ${({ percent }: ICircleProps) => draw(percent)} 1s ease forwards;
`

export interface IDoughnutProps {
  size?: number
  percent?: number
}

const Doughnut = ({ size = 64, percent = 0 }: IDoughnutProps) => (
  <svg width={size} viewBox="0 0 42 42">
    <circle cx="21" cy="21" r="15.91549430918954" fill="#fff" />
    <circle
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#E7E7E7"
      strokeWidth="3"
    />
    <Circle
      percent={percent}
      cx="21"
      cy="21"
      r="15.91549430918954"
      fill="transparent"
      stroke="#111517"
      strokeWidth="3"
      strokeDasharray="0 100"
      strokeDashoffset="25"
    />
  </svg>
)

export default React.memo(Doughnut)
