export const filter =
  <T>(condition: (value: T) => boolean) =>
  (arr: T[]): T[] =>
    arr.filter(condition)
