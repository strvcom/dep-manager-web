import React from 'react'
import { Sidebar, Content, Wrapper } from './styled'
import { RouteComponentProps } from 'react-router-dom'
import RelatedLibraries from '../../components/Table/RelatedLibraries'

const ProjectDetail = ({
  relatedLibraries,
  recentLibraries,
  ...routeProps
}: ProjectDetailProps) => (
  <Wrapper>
    <Content>
      <h2>Project libraries</h2>
      <div>
        <span>All</span>
        <span>Outdated</span>
        <input placeholder='Search for libraries' />
      </div>
      <RelatedLibraries relatedLibraries={relatedLibraries} {...routeProps} />
    </Content>
    <Sidebar>
      {/* <RecentUpdates
        {...routeProps}
        recentLibraries={recentLibraries.filter(lib =>
          relatedLibraries.filter(rel => rel.libraryName === lib.name).length)}
      /> */}
      {/* <LibraryActualityWidget
        mt={20}
        librariesStatus={{
          totalUsed: relatedLibraries.length,
          upToDate: relatedLibraries.filter(lib => lib.status === 'upToDate').length,
        }}
      /> */}
    </Sidebar>
  </Wrapper>
)

export interface ProjectDetailProps
  extends RouteComponentProps<{ department: string }> {
  relatedLibraries: any[]
  recentLibraries: any[]
}

export default ProjectDetail
