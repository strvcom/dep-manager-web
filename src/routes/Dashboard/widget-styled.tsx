import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { typography } from '../../styles/themes/mixins'

export const ItemLink = styled(Link)`
  display: block;
  margin-top: 20px;
  padding-right: 20px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`

export const Items = styled.div`
  overflow: auto;
  margin-right: -30px;
`

export const TitleContainer = styled.div`
  ${typography.subtitle}
  line-height: 17px;
  display: flex;
  justify-content: space-between;
`

export const Status = styled.section`
  display: flex;
  justify-content: space-between;
  ${typography.subtitle}
  color: ${props => props.theme.primaryColor};
  `

export const Count = styled.span`
  opacity: 0.5;
  ${typography.body}
  font-size: 14px;
  color: ${props => props.theme.primaryColor};
`

export const StatusWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export const StatusContainer = styled.div`
  ${typography.subtitle}
  line-height: 17px;
`

export const Percent = styled.p`
  ${typography.subtitle}
  opacity: 0.5;
`

export const UpdatedTime = styled.span`
  opacity: 0.25;
  ${typography.caption}
  font-size: 11px;
  color: ${props => props.theme.primaryColor};
`
