import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
  font-family: 'Maison Neue';
  font-size: 14px;
  line-height: 17px;
  display: flex;
  justify-content: space-between;
`

export const Status = styled.section`
  display: flex;
  justify-content: space-between;
  font-family: 'Maison Neue';
  font-size: 14px;
  line-height: 17px;
`

export const Count = styled.span`
  opacity: 0.5;
  color: #000000;
  font-family: 'Microsoft Sans Serif';
  line-height: 16px;
`

export const StatusWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

export const StatusContainer = styled.div`
  font-family: 'Maison Neue';
  font-size: 14px;
  line-height: 17px;
`

export const Percent = styled.p`
  opacity: 0.5;
`

export const UpdatedTime = styled.span`
  opacity: 0.25;
  font-family: 'Maison Neue';
  font-size: 11px;
  font-weight: 500;
  line-height: 13px;
`
