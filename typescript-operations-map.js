const types = (type) => [type, type.replace(/^\w/u, (c) => c.toUpperCase())]

const plugin = (_schema, operations) => {
  const map = {
    query: [],
    mutation: [],
    subscription: [],
  }

  for (const { document } of operations) {
    if (document && document.definitions) {
      for (const { kind, operation: type, name } of document.definitions) {
        if (kind === 'OperationDefinition' && name && name.value) {
          map[type].push(name.value)
        }
      }
    }
  }

  return `
    export type OperationMap = {
      ${Object.keys(map)
        .map(types)
        .map(
          ([type, Type]) => `
          ${type}: {
            ${map[type]
              .map(
                (operation) => `
                ${operation}: {
                  data: ${operation}${Type}
                  variables: ${operation}${Type}Variables
                }
              `
              )
              .join('\n')}
          }
        `
        )
        .join('\n')}
    }
  `
}

module.exports = { plugin }
