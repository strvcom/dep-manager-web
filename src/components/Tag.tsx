import React from 'react'
import styled from '../styles/styled'
import { palette, typography } from '../styles/themes/mixins'

export interface VersionTagProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  warning?: boolean
  critical?: boolean
}

const Tag = styled(({ warning, critical, ...props }: VersionTagProps) => (
  <span {...props} />
))`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  ${typography.tag}
  ${({ warning, critical }) => {
    if (critical) {
      return `
        background-color: ${palette.palePink};
        color: ${palette.red};
      `
    }
    if (warning) {
      return `
        background-color: ${palette.eggShell};
        color: ${palette.ocher};
      `
    }
  }};
`

export default Tag
