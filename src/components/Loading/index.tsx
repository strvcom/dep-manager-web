import styled, { keyframes } from 'styled-components'

const loading = keyframes`
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }

  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
`

interface BarLoaderProps {
  color?: string
  duration?: number
  size?: number
}

const color = (props: BarLoaderProps) => props.color
const duration = (multiplier: number) => (props: BarLoaderProps) =>
  `${(props.duration || 0) * multiplier}s`

const BarLoader = styled('div')<BarLoaderProps>`
  animation: ${loading} 1s infinite ease-in-out;
  animation-delay: ${duration(-0.16)};
  background: ${color};
  color: ${color};
  font-size: ${({ size }) => size}px;
  height: 4em;
  margin: 88px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 1em;

  &::before {
    animation: ${loading} 1s infinite ease-in-out;
    animation-delay: ${duration(-0.32)};
    background: ${color};
    content: '';
    height: 4em;
    left: -1.5em;
    position: absolute;
    top: 0;
    width: 1em;
  }

  &::after {
    animation: ${loading} 1s infinite ease-in-out;
    animation-delay: ${duration(0.08)};
    background: ${color};
    content: '';
    height: 4em;
    left: 1.5em;
    position: absolute;
    top: 0;
    width: 1em;
  }
`
BarLoader.defaultProps = {
  color: '#000',
  duration: 1,
  size: 11,
}

export default BarLoader
