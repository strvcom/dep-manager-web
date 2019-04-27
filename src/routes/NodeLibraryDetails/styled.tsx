import styled from 'styled-components'

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
  background-color: ${props => props.theme.backgroundColor};
  border: none;
  outline: none;
  font-size: 14px;
  line-height: 16px;

  &::placeholder {
    opacity: 0.25;
  }
`
