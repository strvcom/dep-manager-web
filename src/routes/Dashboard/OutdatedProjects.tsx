import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Items, ItemLink, TitleContainer } from './widget-styled'
import WidgetContainer, { WidgetTitle } from '../../components/Charts/Container'

const OutdatedProjects = ({
  width,
  height,
  match,
  outDatedProjects
}: OutdatedProjectsProps) => (
  <WidgetContainer height={height} width={width}>
    <WidgetTitle>Outdated on</WidgetTitle>
    <Items>
      {outDatedProjects.map(prj => (
        <ItemLink
          to={`/${match!.params.department}/project/${prj.projectName}`}
          key={prj.projectName}
        >
          <TitleContainer>
            <span>{prj.projectName}</span>
            <span>{prj.currentVersion}</span>
          </TitleContainer>
        </ItemLink>
      ))}
    </Items>
  </WidgetContainer>
)

export interface OutdatedProjectsProps
  extends RouteComponentProps<{ department: string }> {
  width?: string
  height?: string
  outDatedProjects: any[]
}

export default React.memo(OutdatedProjects)
