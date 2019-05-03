import React, { memo, FunctionComponent } from 'react'

import WidgetContainer, { WidgetContainerProps, WidgetTitle } from '../Charts/Container'
import { Items, ItemLink, TitleContainer, UpdatedTime } from '../../routes/Dashboard/widget-styled'

import { RecentUpdates_library as ILibrary } from './graphql-types/RecentUpdates_library'

interface IProps extends Pick<WidgetContainerProps, 'width'> {
  libraries: ILibrary[]
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const RecentUpdates: FunctionComponent<IProps> = ({ width, libraries }: IProps): JSX.Element => (
  <WidgetContainer width={width}>
    <WidgetTitle>Recent Updates</WidgetTitle>
    <Items>
      {libraries.map(lib => (
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
