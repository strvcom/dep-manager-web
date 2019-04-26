// @ts-ignore
global.deepDescribe = (name: string, describer: () => void) => {
  const recurse = (names: string[]): void => {
    const curr = names.shift()

    if (names.length) {
      // @ts-ignore
      describe(curr, () => recurse(names))
    } else {
      // @ts-ignore
      describe(curr, describer)
    }
  }

  recurse(name.split('/'))
}

interface IContext {
  [k: string]: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

// @ts-ignore
expect.extend({
  contextContaining: (received: IContext, compare: IContext) => {
    const clone = { ...compare }

    // improve testing UI.
    compare.toString = () => JSON.stringify(compare)

    // @ts-ignore
    const pass = expect
      .objectContaining(clone)
      .asymmetricMatch(received.getContext())

    if (pass) {
      return {
        message: () => `expected ${received} not to be divisible by teste`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be divisible by teste`,
        pass: false,
      }
    }
  },
})
