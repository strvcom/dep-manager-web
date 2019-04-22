import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, color, number } from '@storybook/addon-knobs'

import Bar from './Bar'
import Doughnut from './Doughnut'

const percentage = {
  range: true,
  min: 0,
  max: 100,
  step: 5
}

storiesOf('Charts', module)
  .addDecorator(withKnobs)
  .add('Bar', () => <Bar fill={number('Filled (%)', 50, percentage)} />)
  .add('Doughnut', () => (
    <Doughnut
      size={number('Size', 64)}
      percent={number('Filled (%)', 50, percentage)}
    />
  ))
