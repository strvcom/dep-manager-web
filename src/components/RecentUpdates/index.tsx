import React, { memo, FunctionComponent } from 'react'

import { GT } from '~api/client'
import WidgetContainer, { WidgetContainerProps, WidgetTitle } from '../Charts/Container'
import { Items, ItemLink, TitleContainer, UpdatedTime } from '../../routes/Dashboard/widget-styled'

interface IProps extends Pick<WidgetContainerProps, 'width'> {
  libraries: GT.RecentUpdates_libraryFragment[]
  department: GT.BidaDepartment
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const RecentUpdates: FunctionComponent<IProps> = ({ department, width, libraries }: IProps) => (
  <WidgetContainer width={width}>
    <WidgetTitle>Recent Updates</WidgetTitle>
    <Items>
      {libraries.map((lib) => (
        <ItemLink
          to={`/${department.toLowerCase()}/libraries/${encodeURIComponent(lib.name)}`}
          key={lib.id}
        >
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
