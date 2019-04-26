import React, { memo, FunctionComponent } from 'react'

import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle,
} from '../../components/Charts/Container'

import { Items, ItemLink, TitleContainer, UpdatedTime } from './widget-styled'

interface ILibrary {
  id: string
  name: string
  version: string
  updatedAt?: string
}

interface IProps extends Pick<WidgetContainerProps, 'width'> {
  libraries: ILibrary[]
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const RecentUpdates: FunctionComponent<IProps> = ({
  width,
  libraries,
}: IProps): JSX.Element => (
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
            <UpdatedTime>
              {dateFormatter.format(new Date(lib.updatedAt))}
            </UpdatedTime>
          )}
        </ItemLink>
      ))}
    </Items>
  </WidgetContainer>
)

export default memo(RecentUpdates)
