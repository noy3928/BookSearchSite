import { fetchBook } from "../"
import { book } from "@/shared/fixtures/book"
import apiInstance from "../config"

jest.mock("../config")

describe("fetchBook", () => {
  beforeEach(() => {
    ;(
      apiInstance.get as jest.MockedFunction<typeof apiInstance.get>
    ).mockResolvedValue({ data: book })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("isbn을 이용해서 book을 fetch한다.", async () => {
    const isbn = "1234567890"
    const result = await fetchBook(isbn)
    expect(result).toEqual(book)
    expect(apiInstance.get).toHaveBeenCalledWith(`/books/${isbn}`)
  })

  it("fetch 요청에 에러가 발생하면, 에러를 내뱉는다.", async () => {
    const isbn = "1234567890"
    ;(
      apiInstance.get as jest.MockedFunction<typeof apiInstance.get>
    ).mockImplementationOnce(() =>
      Promise.reject(new Error("API request failed"))
    )

    await expect(fetchBook(isbn)).rejects.toThrow("API request failed")
  })
})
