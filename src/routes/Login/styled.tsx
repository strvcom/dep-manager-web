import styled from '../../styles/styled'
import Button from '../../components/Button'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: ${props => props.theme.backgroundColor};
`

export const LoginButton = styled(Button)`
  margin-top: 150px;
`
