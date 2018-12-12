import React from 'react'
import styled from '../styles/styled'
import versionDiff from '../utils/version-diff'
import { palette, typography } from '../styles/themes/mixins'

export interface VersionTagProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  > {
  status: ReturnType<typeof versionDiff>
}

const VersionTag = styled(({ status, ...props }: VersionTagProps) => (
  <span {...props} />
))`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 2px;
  ${typography.tag}
  ${({ status }) => {
    switch (status) {
      case 'major':
        return `
        background-color: ${palette.palePink};
        color: ${palette.red};
      `
      case 'minor':
        return `
        background-color: ${palette.eggShell};
        color: ${palette.ocher};
      `
      default:
        return 'color: inherit'
    }
  }};
`

export default VersionTag
