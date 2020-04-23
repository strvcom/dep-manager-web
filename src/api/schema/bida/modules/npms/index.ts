/**
 * This modules interconnects NPM packages with analysis
 * data from https://npms.io/.
 *
 * @see: https://api-docs.npms.io/
 */

import { Query } from './resolvers/Query'
import { NPMPackage } from './resolvers/NPMPackage'
import { NPMDependency } from './resolvers/NPMDependency'
import typeDefs from './npms.graphql'

const resolvers = { Query, NPMPackage, NPMDependency }

export default { typeDefs, resolvers }
