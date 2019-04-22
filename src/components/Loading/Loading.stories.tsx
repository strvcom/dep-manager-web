import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, color, number } from '@storybook/addon-knobs'

import Loading from './'

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Loading
      duration={number('Duration', 1)}
      size={number('Size', 11)}
      color={color('Color', '#000')}
    >
      Click me
    </Loading>
  ))
