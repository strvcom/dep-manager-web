import { ResolverFunction } from '../../utils/ResolverFunction'
import PackageJSON from '../../utils/package-json'
import { NodePackage } from '../../data/Repository/__generated-types/NodePackage'

const name: ResolverFunction<null, string | null, NodePackage> = (
  blob,
  _,
  { cache }
) => {
  if (!blob.text) return null
  const packageJSON: PackageJSON = JSON.parse(blob.text)
  return packageJSON.name || null
}

export default {
  name
}
