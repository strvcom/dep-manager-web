import React from 'react'
import styled from 'styled-components'

export const Wrapper = styled.section`
  margin-top: 60px;
  flex: 1 1 auto;
`

export interface CurrentVersionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  status: 'major' | 'minor'
}
const CurrentVersionCmp = ({ status, ...props }: CurrentVersionProps) => (
  <span {...props} />
)
export const CurrentVersion = styled(CurrentVersionCmp)`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  line-height: 20px;
  ${({ status }) => {
    switch (status) {
      case 'major':
        return `
        background-color: #ffd1d9;
        color: #ef0d33;
      `
      case 'minor':
        return `
        background-color: #ffefbb;
        color: #c2950b;
      `
      default:
        return 'color: inherit'
    }
  }};
`
