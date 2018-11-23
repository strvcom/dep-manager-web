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
import { LibrariesQuery_libraries_nodes } from '../../data/Library/__generated-types/LibrariesQuery'

export interface RecentUpdatesProps
  extends Pick<WidgetContainerProps, 'width'> {
  department: Department
}

const RecentUpdates = ({ width, department }: RecentUpdatesProps) => {
  const now = new Date()
  const firstDayOfMonth = React.useMemo(
    () => new Date(now.getFullYear(), now.getMonth(), 1),
    [now.getFullYear(), now.getMonth()]
  )
  const { data: libraries } = useLibraries(department)
  if (!libraries) return null
  const libsFilter = React.useCallback(
    (lib: LibrariesQuery_libraries_nodes) =>
      new Date(lib.date) > firstDayOfMonth,
    [firstDayOfMonth]
  )
  const filteredLibraries = React.useMemo(
    () =>
      libraries.reduce<JSX.Element[]>((acc, lib) => {
        if (libsFilter(lib)) {
          acc.push(
            <LibraryLink to='#' key={lib.id}>
              <NameAndVersion>
                <span>{lib.name}</span>
                <span>{lib.version}</span>
              </NameAndVersion>
              <UpdatedTime>
                {dateFormatter.format(new Date(lib.date))}
              </UpdatedTime>
            </LibraryLink>
          )
        }
        return acc
      }, []),
    [libraries, libsFilter]
  )
  return (
    <WidgetContainer width={width}>
      <WidgetTitle>Recent Updates</WidgetTitle>
      <Libraries>{filteredLibraries}</Libraries>
    </WidgetContainer>
  )
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export default RecentUpdates
