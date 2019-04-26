import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, text } from '@storybook/addon-knobs'
import styled from 'styled-components'

import NavBar, { NavBarLink } from './'

const Logo = styled.div`
  color: white;
`

storiesOf('NavBar', module).add('default', () => (
  <NavBar logo={boolean('Show logo', true) ? <Logo>logo</Logo> : null}>
    {boolean('Show links', true) ? 
      <>
        <NavBarLink to="/first">{text('First', 'First')}</NavBarLink>
        <NavBarLink to="/second">{text('Second', 'Second')}</NavBarLink>
        <NavBarLink to="/third">{text('Third', 'Third')}</NavBarLink>
        <NavBarLink to="/fourth">{text('Fourth', 'Fourth')}</NavBarLink>
      </>
     : null}
  </NavBar>
))
