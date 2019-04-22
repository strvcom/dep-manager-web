import styled, { css } from 'styled-components'
import { typography, palette } from '../../styles/themes/mixins'

export enum BadgeType {
  DANGER = 'DANGER',
  WARNING = 'WARNING'
}

export interface BadgeProps {
  type?: BadgeType | null
}

const typeStyle = (background: string, color: string) => css`
  background-color: ${background};
  color: ${color};
`

const styles = {
  [BadgeType.DANGER]: typeStyle(palette.palePink, palette.red),
  [BadgeType.WARNING]: typeStyle(palette.eggShell, palette.ocher)
}

const Badge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 2px;

  & + & {
    margin-left: 0.25em;
  }

  ${typography.tag}
  ${({ type }: BadgeProps) => (type ? styles[type] : null)}
`

export default Badge
