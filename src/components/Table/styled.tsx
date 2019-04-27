import React from 'react'
import * as Virtual from 'react-virtualized'
import styled from 'styled-components'
import { typography } from '../../styles/themes/mixins'

export const Wrapper = styled.section`
  margin-top: 60px;
  flex: 1 1 auto;
`

const rowClassName = ({ index }: Virtual.Index): string =>
  index >= 0 ? 'row' : ''

export const StyledTable = styled(
  React.memo((props: Virtual.TableProps) => (
    <Virtual.Table
      {...props}
      headerClassName="header"
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
