import React from 'react'
import {
  WidgetContainer,
  WidgetTitle,
  Libraries,
  LibraryLink,
  NameAndVersion,
  UpdatedTime,
  WidgetContainerProps
} from './styled'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'

export interface RecentUpdatesProps
  extends Pick<WidgetContainerProps, 'width'> {
  libraries: LibrariesQuery_libraries[]
}

const RecentUpdates = ({ width, libraries }: RecentUpdatesProps) => {
  return (
    <WidgetContainer width={width}>
      <WidgetTitle>Recent Updates</WidgetTitle>
      <Libraries>
        {libraries.map(lib => (
          <LibraryLink to='#' key={lib.id}>
            <NameAndVersion>
              <span>{lib.name}</span>
              <span>{lib.version}</span>
            </NameAndVersion>
            <UpdatedTime>
              {dateFormatter.format(new Date(lib.date))}
            </UpdatedTime>
          </LibraryLink>
        ))}
      </Libraries>
    </WidgetContainer>
  )
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export default RecentUpdates
