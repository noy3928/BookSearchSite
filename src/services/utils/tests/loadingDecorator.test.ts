import { loadingDecorator } from "./loadingDecorator"

describe("loadingDecorator", () => {
  it("setIsLoading과 추가로 받아온 함수가 올바른 순서로 실행된다.", async () => {
    const setIsLoading = jest.fn()
    const func = jest.fn().mockResolvedValue("result")
    const decoratedFunc = loadingDecorator(setIsLoading)(func)

    const result = await decoratedFunc("arg")

    // setIsLoading이 true -> false 순서로 호출되는지 확인
    expect(setIsLoading).toHaveBeenNthCalledWith(1, true)
    expect(setIsLoading).toHaveBeenNthCalledWith(2, false)

    // 올바른 인자와 함께 호출되는지 확인
    expect(func).toHaveBeenCalledWith("arg")

    // decorated function 함수가 올바른 결과물을 반환하는지 확인
    expect(result).toBe("result")
  })
})
