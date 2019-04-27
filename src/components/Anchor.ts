import styled from 'styled-components'
import { typography } from '../styles/themes/mixins'

const Anchor = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  ${typography.body}
`
export default Anchor
