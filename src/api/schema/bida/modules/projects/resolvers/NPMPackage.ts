import {
  visit,
  ASTNode,
  FieldNode,
  InlineFragmentNode,
  FragmentDefinitionNode,
} from 'graphql/language'
import gql from 'graphql-tag'

import {
  any,
  append,
  both,
  lensPath,
  lensProp,
  over,
  path,
  pathEq,
  pathOr,
  propEq,
  pipe,
  set,
} from 'ramda'

import { Query, IProjectsArgs, IProjectEdge } from './Query'

const dependentsSelection = gql`
  fragment RepositoryDependencies on SearchResultItemConnection {
    edges {
      node {
        ... on Repository {
          name
          npmPackage {
            dependencies {
              version
              package {
                name
              }
            }
          }
        }
      }
    }
  }
`.definitions[0].selectionSet.selections[0]

/**
 * Verifies if an edge depends on a given library.
 *
 * @param name Dependence library name
 */
const dependsOn = (name: string): (() => boolean) =>
  pipe(
    pathOr([], ['node', 'npmPackage', 'dependencies']),
    any(pathEq(['package', 'name'], name))
  )

interface IRepository {
  name: string
}

export interface IDependentNode {
  __typename: string
  __parent: {
    name: string
    version: string
  }
  repository: IRepository
}

interface IDependentEdge {
  cursor: string
  node: IDependentNode
}

type IEdgeToDependent = (repository: IProjectEdge) => IDependentEdge

/**
 * Normalize a Repository edge into an Dependent edge (with meta-data info)
 */
const edgeToDependent = (name: string, version: string): IEdgeToDependent => ({
  cursor,
  node,
}) => ({
  cursor,
  node: {
    __typename: 'Dependent',
    __parent: { name, version },
    repository: node,
  },
})

/**
 * Verifies if an AST node is a Dependent::repository field.
 */
const isRepositoryField = both(
  propEq('kind', 'Field'),
  pathEq(['name', 'value'], 'repository')
)

/*
 * Find the Dependent::repository field when present, and adapt it's
 * selectionSet into GitHub's expectation for Repository type.
 */
const onLeaveFragment = (
  node: InlineFragmentNode | FragmentDefinitionNode
): FieldNode | null | undefined => {
  if (node.typeCondition && node.typeCondition.name.value === 'Dependent') {
    const selections = node.selectionSet.selections.filter(
      isRepositoryField
    ) as FieldNode[]

    // skip this Dependent fragment entirely, when not
    // requesting repository data.
    if (!selections.length) return null

    const selectionSet = {
      kind: 'SelectionSet',
      selections: [].concat(
        // @ts-ignore
        ...selections.map(path(['selectionSet', 'selections']))
      ),
    }

    return pipe(
      set(lensPath(['typeCondition', 'name', 'value']), 'Repository'),
      // @ts-ignore
      set(lensProp('selectionSet'), selectionSet)
    )(node)
  }
}

/**
 * An AST visitor to adapt request of dependents field on-to GitHub search
 * API requirements.
 *
 * We use ramda on returns to benefit from immutability when altering the AST.
 */
const visitor = {
  /**
   * Alter the selectionSet for the dependents field to include necessary
   * data on the Repository (package.json blob, for instance).
   */
  leave: (node: ASTNode, key: string, parentNode: FieldNode) => {
    if (
      node.kind === 'SelectionSet' &&
      parentNode.name &&
      parentNode.name.value === 'dependents'
    ) {
      return over(lensProp('selections'), append(dependentsSelection), node)
    }
  },

  InlineFragment: { leave: onLeaveFragment },
  FragmentDefinition: { leave: onLeaveFragment },
}

interface INPMPackage {
  name: string
  version: string
}

/**
 * NPMPackage::dependents
 *
 * Resolves the STRV repositories that depend on a given package.
 *
 * Currently, we rely on querying the repositories' package.json and
 * manually iterating each to look for dependencies on the root package.
 * This is not performatic at all. The APIs we have cannot resolve these
 * scenarios efficiently.
 *
 * @ALERT do NOT rely on pagination info when using this field!
 */
const dependents = {
  fragment: `... on NPMPackage { name version }`,
  resolve: async (
    { name, version }: INPMPackage,
    args: IProjectsArgs,
    context: any,
    info: any
  ) => {
    // transform request selection.
    const fieldNodes = visit(info.fieldNodes, visitor)

    // reuse Query::projects delegation logic.
    const projectsConnection = await Query.projects(null, args, context, {
      ...info,
      fieldNodes,
    })

    // find dependent edges.
    const edges = projectsConnection.edges
      .filter(dependsOn(name))
      .map(edgeToDependent(name, version))

    // "fix" counts.
    const repositoryCount = edges.length

    return { edges, repositoryCount }
  },
}

export const NPMPackage = { dependents }
