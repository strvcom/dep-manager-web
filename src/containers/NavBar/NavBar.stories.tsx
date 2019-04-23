import React, { Fragment } from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'

import NavBar, { NavBarLink } from './'

storiesOf('NavBar', module).add('default', () => (
  <NavBar
    logo={
      boolean('Show logo', true) ? (
        <div style={{ color: 'white' }}>logo</div>
      ) : null
    }
  >
    {boolean('Show links', true) ? (
      <Fragment>
        <NavBarLink to='/first'>{text('First', 'First')}</NavBarLink>
        <NavBarLink to='/second'>{text('Second', 'Second')}</NavBarLink>
        <NavBarLink to='/third'>{text('Third', 'Third')}</NavBarLink>
        <NavBarLink to='/fourth'>{text('Fourth', 'Fourth')}</NavBarLink>
      </Fragment>
    ) : null}
  </NavBar>
))
