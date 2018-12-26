import { NodeProjectRoot } from './__generated-types/NodeProjectRoot'
import { reduceLibrariesInfo } from './helpers'
import { createResolver } from '../../../utils/ResolverFunction'

const alertedLibraries = createResolver<NodeProjectRoot>(
  async ({ root }) => (await reduceLibrariesInfo(root)).alertedLibraries
)

export default alertedLibraries
