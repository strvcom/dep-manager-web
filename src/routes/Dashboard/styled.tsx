import styled from 'styled-components'
import React from 'react'
import { Link } from 'react-router-dom'

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
export const TableRow = styled(Link)`
  text-decoration: none;
  color: initial;
`

export const WidgetContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
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
