import React, { memo } from 'react'

import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle
} from '../../components/Charts/Container'

import { Items, ItemLink, TitleContainer, UpdatedTime } from './widget-styled'

export interface RecentUpdatesProps
  extends Pick<WidgetContainerProps, 'width'> {
  libraries: any[]
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
})

const RecentUpdates = ({ width, libraries }: RecentUpdatesProps) => (
  <WidgetContainer width={width}>
    <WidgetTitle>Recent Updates</WidgetTitle>
    <Items>
      {libraries.map(lib => (
        <ItemLink to='#' key={lib.id}>
          <TitleContainer>
            <span>{lib.name}</span>
            <span>{lib.version}</span>
          </TitleContainer>
          {lib.analysis.collected.metadata.date && (
            <UpdatedTime>
              {dateFormatter.format(
                new Date(lib.analysis.collected.metadata.date)
              )}
            </UpdatedTime>
          )}
        </ItemLink>
      ))}
    </Items>
  </WidgetContainer>
)

export default memo(RecentUpdates)
