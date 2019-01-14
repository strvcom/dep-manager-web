import React from 'react'
import { Items, ItemLink, TitleContainer, UpdatedTime } from './widget-styled'
import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle
} from '../../components/Charts/Container'
import gql from 'graphql-tag'
import { RecentUpdatesLibrariesItem } from './__generated-types/RecentUpdatesLibrariesItem'

gql`
  fragment RecentUpdatesLibrariesItem on BidaNodeLibrary {
    id
    name
    version
    date
  }
`

export interface RecentUpdatesProps
  extends Pick<WidgetContainerProps, 'width'> {
  libraries: RecentUpdatesLibrariesItem[]
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
            {lib.date && (
              <UpdatedTime>
                {dateFormatter.format(new Date(lib.date))}
              </UpdatedTime>
            )}
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
