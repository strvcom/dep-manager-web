/* eslint-disable no-shadow */
import { print } from 'graphql/language'
import { over, lensProp } from 'ramda'

import { combine, IGraphQLModule } from '../lib/modules'

import npm from './modules/npm'
import npms from './modules/npms'
import projects from './modules/projects'

const modules: IGraphQLModule[] = [npm, npms, projects]

const schema: IGraphQLModule = modules
  // extract typeDefs text, AST is not compatible to "combine"
  .map(over(lensProp('typeDefs'), print))
  .reduce(combine)

export { schema }
