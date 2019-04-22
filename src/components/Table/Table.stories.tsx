import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import StatusColumn from './StatusColumn'

storiesOf('StatusColumn', module).add('default', () => (
  <StatusColumn
    outDated={number('Outdated', 10)}
    alerts={number('Alerts', 5)}
  />
))
