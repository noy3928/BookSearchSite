import { searchAndSetBooks } from "../"
import { resolveKeyword } from "../resolveKeyword"
import { fetchBooksByType } from "../fetchBooksByType"
import { Book } from "@/shared/types/book"

jest.mock("../resolveKeyword")
jest.mock("../fetchBooksByType")

describe("searchAndSetBooks", () => {
  const setState = jest.fn()
  const loadingDecorator = jest.fn(func => func)
  const setTotalBooks = jest.fn()
  const pageNumber = 1
  const keyword = "test"
  const resolvedKeyword = "resolvedTest"
  const books: Book[] = []

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("주어진 함수들이 올바른 인자들로 호출된다. ", async () => {
    ;(resolveKeyword as jest.Mock)
      .mockResolvedValue(resolvedKeyword)(fetchBooksByType as jest.Mock)
      .mockResolvedValue(books)

    const search =
      searchAndSetBooks(setState)(loadingDecorator)(setTotalBooks)(pageNumber)

    await search(keyword)

    expect(resolveKeyword).toHaveBeenCalledWith(keyword)
    expect(fetchBooksByType).toHaveBeenCalledWith(pageNumber)(setTotalBooks)(
      resolvedKeyword
    )
    expect(loadingDecorator).toHaveBeenCalled()
    expect(setState).toHaveBeenCalledWith(books)
  })
})
