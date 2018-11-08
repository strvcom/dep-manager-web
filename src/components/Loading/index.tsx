import React from 'react'
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

const BarLoader = styled<BarLoaderProps, 'div'>('div')`
  animation: ${loading} 1s infinite ease-in-out;
  animation-delay: ${props => `${props.duration! * -0.16}s`};
  background: ${props => props.color};
  color: ${props => props.color};
  font-size: ${props => `${props.size}px`};
  height: 4em;
  margin: 88px auto;
  position: relative;
  text-indent: -9999em;
  transform: translateZ(0);
  width: 1em;
  &:before {
    animation: ${loading} 1s infinite ease-in-out;
    animation-delay: ${props => `${props.duration! * -0.32}s`};
    background: ${props => props.color};
    content: "";
    height: 4em;
    left: -1.5em;
    position: absolute;
    top: 0;
    width: 1em;
  }
  &:after {
    animation: ${loading} 1s infinite ease-in-out;
    animation-delay: ${props => `${props.duration! * 0.08}s`};
    background: ${props => props.color};
    content: "";
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

export interface BarLoaderProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    > {
  duration?: number
  size?: number
}

export default BarLoader
