import styled, {keyframes} from 'styled-components'
import {
  width,
  height,
  space,
  WidthProps,
  HeightProps,
  SpaceProps,
} from 'styled-system'
import {Link} from 'react-router-dom'


export const WidgetContainer = styled<
  WidthProps & HeightProps & SpaceProps,
  'div'
>('div')`
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
  font-family: "Maison Neue";
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
`


const draw = (percent: number) => keyframes`
  to {
    stroke-dasharray: ${percent} ${100 - percent};
    stroke-dashoffset: ${25 + percent};
  }
`

export const Circle = styled<{ percent: number }, 'circle'>('circle')`
  animation: ${({ percent }) => draw(percent)} 1s ease forwards;
`


export const LibraryLink = styled(Link)`
  display: block;
  margin-top: 20px;
  padding-right: 20px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

export const Libraries = styled.div`
  overflow: auto;
  margin-right: -30px;
`

export const NameAndVersion = styled.div`
  font-family: "Maison Neue";
  font-size: 14px;
  line-height: 17px;
  display: flex;
  justify-content: space-between;
`

const grow = (width: number) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${width}%;
  }
`

export const BarChart = styled<{ fill: number }, 'div'>('div')`
  position: relative;
  margin: 48px 0 24px;
  height: 4px;
  background-color: rgba(17, 21, 23, 0.15);
  &::after {
    content: "";
    display: block;
    position: absolute;
    background-color: #111517;
    top: 0;
    left: 0;
    height: 4px;
    animation: ${({ fill }) => grow(fill || 0)} 1s ease forwards;
  }
`

export const Status = styled.section`
  display: flex;
  justify-content: space-between;
  font-family: "Maison Neue";
  font-size: 14px;
  line-height: 17px;
`

export const Count = styled.span`
  opacity: 0.5;
  color: #000000;
  font-family: "Microsoft Sans Serif";
  line-height: 16px;
`


export const StatusWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export const StatusContainer = styled.div`
  font-family: "Maison Neue";
  font-size: 14px;
  line-height: 17px;
`

export const Percent = styled.p`
  opacity: 0.5;
`
