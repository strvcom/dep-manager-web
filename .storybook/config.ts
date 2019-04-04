import { configure, addDecorator } from '@storybook/react'
import 'babel-polyfill'
import { withThemes } from 'storybook-styled-components'

// then import your themes
import light from '../src/styles/themes/light'
import dark from '../src/styles/themes/dark'

const themes = {
  Light: light,
  Dark: dark
}

// now add the decorator
addDecorator(withThemes(themes))

// load stories.
const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/)
configure(() => req.keys().forEach(filename => req(filename)), module)
