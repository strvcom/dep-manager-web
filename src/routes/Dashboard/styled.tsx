import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const StyledDashboard = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
`

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
`
export const TableRow = styled(Link)`
  text-decoration: none;
  color: initial;
`

export const WidgetContainer = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
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
