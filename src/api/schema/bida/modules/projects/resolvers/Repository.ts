const DEPARTMENTS = ['FRONTEND', 'BACKEND', 'ANDROID', 'IOS']

/**
 * Repository::departments
 *
 * Resolves the STRV departments of a repository based on present topics.
 */
const departments = {
  fragment: `
    ... on Repository {
      repositoryTopics (first: 10) {
        nodes {
          topic {
            name
          }
        }
      }
    }
  `,
  resolve: ({ repositoryTopics }: any) =>
    repositoryTopics.nodes
      .map(({ topic: { name } }: any) => name)
      .map((name: string) => name.toUpperCase())
      .filter((name: string) => DEPARTMENTS.includes(name))
}

export const Repository = { departments }
