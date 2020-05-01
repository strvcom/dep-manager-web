import { combine, IGraphQLModule, SchemaDefinition } from './lib/modules'

import npm from './modules/npm'
import npms from './modules/npms'
import projects from './modules/projects'

const modules: IGraphQLModule[] = [npm, npms, projects]

const schema = modules.reduce(combine) as SchemaDefinition

export { schema }
