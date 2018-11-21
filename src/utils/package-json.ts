export default interface NodePackage {
  readonly name: string

  readonly version?: string

  readonly description?: string

  readonly keywords?: string[]

  readonly homepage?: string

  readonly bugs?: string | Bugs

  readonly license?: string

  readonly author?: string | Author

  readonly contributors?: string[] | Author[]

  readonly files?: string[]

  readonly main?: string

  readonly bin?: string | BinMap

  readonly man?: string | string[]

  readonly directories?: Directories

  readonly repository?: string | Repository

  readonly scripts?: ScriptsMap

  readonly config?: Config

  readonly dependencies?: DependencyMap

  readonly devDependencies?: DependencyMap

  readonly peerDependencies?: DependencyMap

  readonly optionalDependencies?: DependencyMap

  readonly bundledDependencies?: string[]

  readonly engines?: Engines

  readonly os?: string[]

  readonly cpu?: string[]

  readonly preferGlobal?: boolean

  readonly private?: boolean

  readonly publishConfig?: PublishConfig
}

/**
 * An author or contributor
 */
export interface Author {
  name: string
  email?: string
  homepage?: string
}

/**
 * A map of exposed bin commands
 */
export interface BinMap {
  [commandName: string]: string
}

/**
 * A bugs link
 */
export interface Bugs {
  email: string
  url: string
}

export interface Config {
  name?: string
  config?: object
}

/**
 * A map of dependencies
 */
export interface DependencyMap {
  [dependencyName: string]: string
}

/**
 * CommonJS package structure
 */
export interface Directories {
  lib?: string
  bin?: string
  man?: string
  doc?: string
  example?: string
}

export interface Engines {
  node?: string
  npm?: string
}

export interface PublishConfig {
  registry?: string
}

/**
 * A project repository
 */
export interface Repository {
  type: string
  url: string
}

export interface ScriptsMap {
  [scriptName: string]: string
}
