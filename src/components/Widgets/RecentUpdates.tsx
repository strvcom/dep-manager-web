import React from 'react'
import { format } from 'date-fns'
import {
  WidgetContainer,
  WidgetTitle,
  Libraries,
  LibraryLink,
  NameAndVersion,
  UpdatedTime,
  WidgetContainerProps
} from './styled'
import { Department } from '../../config/types'
import { useLibraries } from '../../data/Library'

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
            <UpdatedTime>{format(Date.now(), 'MMM D, YYYY')}</UpdatedTime>
          </LibraryLink>
        ))}
      </Libraries>
    </WidgetContainer>
  )
}

export default RecentUpdates
