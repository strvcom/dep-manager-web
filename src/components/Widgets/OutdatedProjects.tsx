import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProjectLibraryRelation } from '../../data/helpers'
import { WidgetContainer, WidgetTitle } from './styled'
import {Libraries, LibraryLink, NameAndVersion} from './styled'

const OutdatedProjects = ({
  width,
  height,
  match: { params },
  outDatedProjects,
}: OutdatedProjectsProps) => (
  <WidgetContainer height={height} width={width}>
    <WidgetTitle>Outdated on</WidgetTitle>
    <Libraries>
      {outDatedProjects.map(prj => (
        <LibraryLink
          to={`/${params.department}/project/${prj.projectName}`}
          key={prj.projectName}
        >
          <NameAndVersion>
            <span>{prj.projectName}</span>
            <span>{prj.currentVersion}</span>
          </NameAndVersion>
        </LibraryLink>
      ))}
    </Libraries>
  </WidgetContainer>
)

export interface OutdatedProjectsProps
  extends RouteComponentProps<{ department: string }> {
  width?: string
  height?: string
  outDatedProjects: ProjectLibraryRelation[]
}

export default React.memo(OutdatedProjects)
