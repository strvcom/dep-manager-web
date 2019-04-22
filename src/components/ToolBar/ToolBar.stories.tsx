import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import ToolBar, { ToolBarLink } from './'

storiesOf('ToolBar', module).add('default', () => (
  <ToolBar
    title={text('Title', 'Nice Title')}
    subtitle={text('Subtitle', 'This is the subtitle')}
    links={
      boolean('Show links', true) ? (
        <Fragment>
          <ToolBarLink to='/first'>{text('First', 'First')}</ToolBarLink>
          <ToolBarLink to='/second'>{text('Second', 'Second')}</ToolBarLink>
          <ToolBarLink to='/third'>{text('Third', 'Third')}</ToolBarLink>
        </Fragment>
      ) : null
    }
  />
))
