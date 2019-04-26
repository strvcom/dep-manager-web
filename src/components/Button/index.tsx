import styled from '../../styles/styled'
import { typography } from '../../styles/themes/mixins'

interface IButtonProps {
  theme: {
    primaryColor: string
    primaryColorAccent: string
  }
}

const Button = styled.button<IButtonProps>`
  ${typography.body}
  height: 70px;
  width: 550px;
  background: ${props => props.theme.primaryColor};
  color: ${props => props.theme.primaryColorAccent};
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
`

export default Button
