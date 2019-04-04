import styled from '../../styles/styled'
import { typography } from '../../styles/themes/mixins'

const Button = styled.button`
  ${typography.body}
  height: 70px;
  width: 550px;
  background: ${(props: any) => props.theme.primaryColor};
  color: ${(props: any) => props.theme.primaryColorAccent};
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
`

export default Button
