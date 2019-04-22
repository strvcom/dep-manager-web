import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import Badge, { BadgeType } from './'

storiesOf('Badge', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <Badge type={select('Type', { None: null, ...BadgeType }, null)}>
      {text('Label', 'Label')}
    </Badge>
  ))
