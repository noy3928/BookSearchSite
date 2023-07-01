import { fetchBooks } from "../"
import { books } from "@/shared/fixtures/book"
import apiInstance from "../config"

jest.mock("../config")

describe("fetchBooks", () => {
  beforeEach(() => {
    ;(
      apiInstance.get as jest.MockedFunction<typeof apiInstance.get>
    ).mockResolvedValue({ data: books })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("keyword와 pageNumber를 이용해서 books를 fetch한다.", async () => {
    const result = await fetchBooks("keyword", 1)
    expect(result).toEqual(books)
    expect(apiInstance.get).toHaveBeenCalledWith(`/search/keyword/1`)
  })

  it("fetch 요청에 에러가 발생하면, 에러를 내뱉는다.", async () => {
    ;(
      apiInstance.get as jest.MockedFunction<typeof apiInstance.get>
    ).mockImplementationOnce(() =>
      Promise.reject(new Error("API request failed"))
    )

    await expect(fetchBooks("keyword", 1)).rejects.toThrow("API request failed")
  })
})
