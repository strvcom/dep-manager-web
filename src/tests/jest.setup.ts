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
