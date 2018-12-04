import React from 'react'
import { Wrapper, Content, Sidebar } from './styled'
import { RouteComponentProps } from 'react-router-dom'
import RelatedProjects from '../../routes/LibrariesDetails/RelatedProjects'
import OutdatedProjects from '../../routes/Dashboard/OutdatedProjects'

const LibraryDetail = ({
  relatedProjects,
  ...routeProps
}: LibraryDetailProps) => (
  <Wrapper>
    <Content>
      <h2>Library projects</h2>
      <div>
        <span>All</span>
        <input placeholder='Search for libraries' />
      </div>
      <RelatedProjects relatedProjects={relatedProjects} {...routeProps} />
    </Content>
    <Sidebar>
      <OutdatedProjects
        outDatedProjects={relatedProjects.filter(
          rel => rel.status !== 'upToDate'
        )}
        {...routeProps}
      />
      {/* <LibraryActualityWidget
        mt={20}
        // title="Related Project Status"
        librariesStatus={{
          totalUsed: relatedProjects.length,
          upToDate: relatedProjects.filter(lib => lib.status === 'upToDate').length,
        }}
      /> */}
    </Sidebar>
  </Wrapper>
)

export interface LibraryDetailProps
  extends RouteComponentProps<{ department: string }> {
  relatedProjects: any[]
}

export default React.memo(LibraryDetail)
