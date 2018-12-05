import React from 'react'
import styled from 'styled-components'
import versionDiff from '../../utils/version-diff'

export const Wrapper = styled.section`
  width: 1140px;
  margin: auto;
  margin-top: 60px;
  display: flex;
  flex: 1 1 auto;
`

export const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`

export const Sidebar = styled.div`
  flex: 0 1 auto;
  margin-left: 35px;
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

export interface CurrentVersionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  status: ReturnType<typeof versionDiff>
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
