import { NodeProjectRoot } from './__generated-types/NodeProjectRoot'
import { reduceLibrariesInfo } from './helpers'
import { createResolver } from '../../../utils/ResolverFunction'

const outdatedLibraries = createResolver<NodeProjectRoot>(
  async ({ root }) => (await reduceLibrariesInfo(root)).outdatedLibraries
)

export default outdatedLibraries
