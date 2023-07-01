type Function = (...args: any[]) => Promise<any> | any

export const pipe =
  (...fns: Function[]) =>
  async (arg: any) =>
    fns.reduce(async (prevPromise: Promise<any>, fn: Function) => {
      const c = await prevPromise
      return fn(c)
    }, Promise.resolve(arg))
