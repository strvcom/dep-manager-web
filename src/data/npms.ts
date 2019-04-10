export interface NPMSPackage {
  analyzedAt: string
  collected: {
    metadata: Metadata
  }
}
export interface Metadata {
  name: string
  scope: string
  version: string
  description: string
  keywords: string[]
  date: string
  publisher: User
  maintainers: User[]
  repository: Repository
  links: Links
  license: string
  dependencies: Dependencies
  releases: Release[]
  hasSelectiveFiles: boolean
}

export interface Dependencies {
  [dependency: string]: string
}

export interface Links {
  npm: string
  homepage: string
  repository: string
  bugs: string
}

export interface User {
  username: string
  email: string
}

export interface Release {
  from: string
  to: string
  count: number
}

export interface Repository {
  type: string
  url: string
}
