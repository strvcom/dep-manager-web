import { configure } from '@storybook/react'
import 'babel-polyfill'

const req = require.context('../stories', true, /\.stories\.(js|jsx|ts|tsx)$/)

configure(() => req.keys().forEach(filename => req(filename)), module)
