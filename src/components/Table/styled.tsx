import React from 'react'
import styled from '../../styles/styled'
import * as Virtual from 'react-virtualized'
import { typography, palette } from '../../styles/themes/mixins'

export const Wrapper = styled.section`
  margin-top: 60px;
  flex: 1 1 auto;
`

const rowClassName = ({ index }: Virtual.Index) => (index >= 0 ? 'row' : '')

export const StyledTable = styled(
  React.memo((props: Virtual.TableProps) => (
    <Virtual.Table
      {...props}
      headerClassName='header'
      rowClassName={rowClassName}
    />
  ))
)`
  .header {
    ${typography.caption}
    display: flex;
    align-items: center;
  }
  .row {
    ${typography.body}
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .ReactVirtualized__Table__sortableHeaderIcon {
    font-size: 2em;
    transform: translateY(-0.1em) rotate(180deg);
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
  ${typography.tag}
`

export const Outdated = styled(Status)`
  ${({ count }) =>
    count &&
    `
    background-color: ${palette.palePink};
    color: ${palette.red};
  `};
`

export const Alerts = styled(Status)`
  ${({ count }) =>
    count &&
    `
    background-color: ${palette.eggShell};
    color: ${palette.ocher};
  `};
`
