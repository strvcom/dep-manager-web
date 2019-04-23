import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { number, text } from '@storybook/addon-knobs'

import ActualityWidget from './'

storiesOf('ActuallityWidget', module).add('default', () => (
  <ActualityWidget
    title={text('Title', 'Widget title')}
    outdated={number('Outdated', 10)}
    total={number('Total', 25)}
  />
))
