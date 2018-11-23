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
import { useLibraries } from '../../data/Library'
import { Department } from '../../data/__generated-types'

export interface RecentUpdatesProps
  extends Pick<WidgetContainerProps, 'width'> {
  department: Department
}

const RecentUpdates = ({ width, department }: RecentUpdatesProps) => {
  const { data: libraries } = useLibraries(department)
  if (!libraries) return null
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
            <UpdatedTime>{dateFormatter.format(Date.now())}</UpdatedTime>
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
