import { Omit } from 'utility-types'

export * from './__generated_types'

export enum Department {
  FRONTEND = 'frontend',
  BACKEND = 'backend',
  IOS = 'ios',
  ANDROID = 'android'
}
export enum Category {
  LIBRARIES = 'libraries',
  PROJECTS = 'projects'
}

// Types

export interface TAuth {
  __typename: 'Auth'
  token: string | null
}

export interface TLibrary {
  __typename: 'Library'
  name: string
  id: string
  date?: string
  version?: string
}

export interface TNodeLibrary extends Omit<TLibrary, '__typename'> {
  __typename: 'NodeLibrary'
}

export interface TLibraryCollection {
  __typename: 'LibraryCollection'
  nodes: TNodeLibrary[] | null
}

// Queries

export interface AuthQuery {
  auth: Pick<TAuth, 'token'>
}

export interface LibrariesQuery {
  libraries: {
    __typename?: 'LibraryCollection'
    nodes: Array<Pick<TNodeLibrary, 'name' | 'version' | 'id' | '__typename'>>
  }
}

// Mutations

export interface ChangeToken {
  auth: TAuth | null
}
export interface ChangeTokenVariables {
  token: string
}
