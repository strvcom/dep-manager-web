import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { text } from '@storybook/addon-knobs'

import ToolBarLink from './'

storiesOf('ToolBarLink', module)
  .add('single', () => (
    <ToolBarLink to='/'>{text('Label', 'Some link')}</ToolBarLink>
  ))
  .add('multiple', () => (
    <Fragment>
      <ToolBarLink to='/first'>{text('First', 'First')}</ToolBarLink>
      <ToolBarLink to='/second'>{text('Second', 'Second')}</ToolBarLink>
      <ToolBarLink to='/third'>{text('Third', 'Third')}</ToolBarLink>
    </Fragment>
  ))
