import styled, { keyframes, Keyframes } from 'styled-components'

const grow = (maxWidth: number): Keyframes => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${maxWidth}%;
  }
`

interface IBarProps {
  fill: number
}

const Bar = styled.div`
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
    animation: ${({ fill }: IBarProps) => grow(fill || 0)} 1s ease forwards;
  }
`

export default Bar
