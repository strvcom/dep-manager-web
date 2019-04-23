import { print } from 'graphql/language'
import { over, lensProp } from 'ramda'

import { combine, Module } from '../lib/modules'

import npm from './modules/npm'
import npms from './modules/npms'
import projects from './modules/projects'

const modules: Module[] = [npm, npms, projects]

const schema: Module = modules
  // extract typeDefs text, AST is not compatible to "combine"
  .map(over(lensProp('typeDefs'), print))
  .reduce(combine)

export { schema }
