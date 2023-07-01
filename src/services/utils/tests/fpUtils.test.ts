import { pipe } from "../fpUtils"

describe("pipe function", () => {
  it("should correctly pipe the functions", async () => {
    const fn1 = jest.fn(x => x + 1)
    const fn2 = jest.fn(x => x * 2)
    const fn3 = jest.fn(x => x - 3)

    const pipedFn = pipe(fn1, fn2, fn3)
    const result = await pipedFn(1)

    expect(fn1).toHaveBeenCalledWith(1)
    expect(fn2).toHaveBeenCalledWith(2)
    expect(fn3).toHaveBeenCalledWith(4)
    expect(result).toBe(1)
  })
})
