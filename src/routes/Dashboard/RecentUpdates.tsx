import React from 'react'
import { Items, ItemLink, TitleContainer, UpdatedTime } from './widget-styled'
import { LibrariesQuery_libraries } from '../../data/Library/__generated-types/LibrariesQuery'
import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle
} from '../../components/Charts/Container'

export interface RecentUpdatesProps
  extends Pick<WidgetContainerProps, 'width'> {
  libraries: LibrariesQuery_libraries[]
}

const RecentUpdates = ({ width, libraries }: RecentUpdatesProps) => {
  return (
    <WidgetContainer width={width}>
      <WidgetTitle>Recent Updates</WidgetTitle>
      <Items>
        {libraries.map(lib => (
          <ItemLink to='#' key={lib.id}>
            <TitleContainer>
              <span>{lib.name}</span>
              <span>{lib.version}</span>
            </TitleContainer>
            <UpdatedTime>
              {dateFormatter.format(new Date(lib.date))}
            </UpdatedTime>
          </ItemLink>
        ))}
      </Items>
    </WidgetContainer>
  )
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

export default RecentUpdates
