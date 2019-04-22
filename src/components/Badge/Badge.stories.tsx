import React from 'react'
import { storiesOf } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'

import Badge, { BadgeType } from './'

storiesOf('Badge', module).add('default', () => (
  <Badge type={select('Type', { None: null, ...BadgeType }, null)}>
    {text('Label', 'Label')}
  </Badge>
))
