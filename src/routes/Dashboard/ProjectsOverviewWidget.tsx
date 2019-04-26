import React, { FunctionComponent } from 'react'
import { Status, Count } from './widget-styled'
import Bar from '../../components/Charts/Bar'
import WidgetContainer, {
  WidgetContainerProps,
  WidgetTitle,
} from '../../components/Charts/Container'

interface IProps extends Pick<WidgetContainerProps, 'width'> {
  total: number
  archived: number
}

const ProjectsOverviewWidget: FunctionComponent<IProps> = ({
  width,
  total,
  archived,
}: IProps): JSX.Element => {
  const active = total - archived
  return (
    <WidgetContainer width={width}>
      <WidgetTitle>Projects Overview</WidgetTitle>
      <Bar fill={(active / total) * 100} />
      <Status>
        <div>
          Active <Count>{active}</Count>
          &nbsp;&nbsp;&nbsp;&nbsp; Archived&nbsp;
          <Count>{archived}</Count>
        </div>
        <div>
          Total <Count>{total}</Count>
        </div>
      </Status>
    </WidgetContainer>
  )
}

export default React.memo(ProjectsOverviewWidget)
