import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text } from '@storybook/addon-knobs'

import ActualityWidget from './'

storiesOf('Charts', module).add('ActuallityWidget', () => (
  <ActualityWidget
    title={text('Title', 'Widget title')}
    outdated={number('Outdated', 10)}
    total={number('Total', 25)}
  />
))
