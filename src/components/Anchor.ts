import styled from '../styles/styled'
import { typography } from '../styles/themes/mixins'

const Anchor = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
  ${typography.body}
`
export default Anchor
