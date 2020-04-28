import React, { memo, FunctionComponent } from 'react'

import { GT } from '~api/client'
import WidgetContainer, { WidgetContainerProps, WidgetTitle } from '../Charts/Container'
import { Items, ItemLink, TitleContainer, UpdatedTime } from '../../routes/Dashboard/widget-styled'

interface IProps extends Pick<WidgetContainerProps, 'width'> {
  libraries: GT.RecentUpdates_libraryFragment[]
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const RecentUpdates: FunctionComponent<IProps> = ({ width, libraries }: IProps) => (
  <WidgetContainer width={width}>
    <WidgetTitle>Recent Updates</WidgetTitle>
    <Items>
      {libraries.map((lib) => (
        <ItemLink to="#" key={lib.id}>
          <TitleContainer>
            <span>{lib.name}</span>
            <span>{lib.version}</span>
          </TitleContainer>
          {lib.updatedAt && (
            <UpdatedTime>{dateFormatter.format(new Date(lib.updatedAt))}</UpdatedTime>
          )}
        </ItemLink>
      ))}
    </Items>
  </WidgetContainer>
)

export default memo(RecentUpdates)
