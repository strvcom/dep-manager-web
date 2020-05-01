import { Query } from './resolvers/Query'
import { Repository } from './resolvers/Repository'
import { NPMPackage } from './resolvers/NPMPackage'
import { Dependent } from './resolvers/Dependent'
import typeDefs from './projects.graphql'

const resolvers = { Query, Repository, NPMPackage, Dependent }

export default { typeDefs, resolvers }
