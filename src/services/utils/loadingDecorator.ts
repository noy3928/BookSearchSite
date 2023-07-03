export const loadingDecorator =
  (setIsLoading: Function) => (func: Function) => async (args: any) => {
    setIsLoading(true)
    const result = await func(args)
    setIsLoading(false)
    return result
  }
