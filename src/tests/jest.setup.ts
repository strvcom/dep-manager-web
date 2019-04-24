// @ts-ignore
global.deepDescribe = (name: string, ...args: any[]) => {
  const recurse = (names: string[]) => {
    const curr = names.shift()

    if (names.length) {
      // @ts-ignore
      describe(curr, () => recurse(names))
    } else {
      // @ts-ignore
      describe(curr, ...args)
    }
  }

  recurse(name.split('/'))
}

// @ts-ignore
expect.extend({
  contextContaining: (received: any, compare: any) => {
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
        pass: true
      }
    } else {
      return {
        message: () => `expected ${received} to be divisible by teste`,
        pass: false
      }
    }
  }
})
