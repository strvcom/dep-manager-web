import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, number } from '@storybook/addon-knobs'

import StatusColumn from './StatusColumn'

storiesOf('StatusColumn', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <StatusColumn
      outDated={number('Outdated', 10)}
      alerts={number('Alerts', 5)}
    />
  ))
