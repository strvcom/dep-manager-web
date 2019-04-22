import 'babel-polyfill'

import { configure, addDecorator } from '@storybook/react'
import { withThemes } from 'storybook-styled-components'
import StoryRouter from 'storybook-react-router'

import light from '../src/styles/themes/light'
import dark from '../src/styles/themes/dark'

const themes = {
  Light: light,
  Dark: dark
}

addDecorator(withThemes(themes))
addDecorator(StoryRouter())

// load stories.
const req = require.context('../src', true, /\.stories\.(js|jsx|ts|tsx)$/)
configure(() => req.keys().forEach(filename => req(filename)), module)
