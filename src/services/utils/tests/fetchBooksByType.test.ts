import { fetchBooksByType } from "../"
import { fetchBooks } from "../../api"
import { filterKeyword } from "../filterKeyword"
import { Book, BookResponse } from "@/shared/types/book"

jest.mock("../../api")
jest.mock("../filterKeyword")

const mockBookResponse: BookResponse = {
  books: [],
  error: "",
  page: "",
  total: "",
}

describe("fetchBooksByType", () => {
  const setTotalBooks = jest.fn()

  const mockFecthBooksByType = fetchBooksByType(1)(setTotalBooks)

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("함수가 실행되고 값이 반환되면", () => {
    it("전체 책의 갯수가 setTotalBooks에 전달된다.", async () => {
      ;(fetchBooks as jest.Mock).mockResolvedValue(mockBookResponse)
      await mockFecthBooksByType({ type: "normal", keywords: ["keyword1"] })
      expect(setTotalBooks).toBeCalled()
    })
  })

  describe("type이 null이면", () => {
    it("null을 반환한다.", async () => {
      const result = await mockFecthBooksByType({ type: null, keywords: [] })
      expect(result).toBeNull()
      expect(setTotalBooks).not.toBeCalled()
    })
  })

  describe("type이 'or'이면", () => {
    it("2번 fetchBooks를 호출한다.", async () => {
      ;(fetchBooks as jest.Mock).mockResolvedValue(mockBookResponse)
      await mockFecthBooksByType({
        type: "or",
        keywords: ["keyword1", "keyword2"],
      })
      expect(fetchBooks).toHaveBeenCalledTimes(2)
      expect(setTotalBooks).toBeCalled()
    })
  })

  describe("type이 'not'이면", () => {
    it("filter된 결과를 반환한다.", async () => {
      ;(fetchBooks as jest.Mock).mockResolvedValue(mockBookResponse)
      ;(filterKeyword as jest.Mock).mockImplementation(
        (keyword: string, books: Book[]) => books
      )
      await mockFecthBooksByType({
        type: "not",
        keywords: ["keyword1", "keyword2"],
      })
      expect(fetchBooks).toBeCalled()
      expect(filterKeyword).toBeCalled()
      expect(setTotalBooks).toBeCalled()
    })
  })

  describe("type이 'normal'이면", () => {
    it("해당 키워드로 fetchBooks를 호출한다.", async () => {
      ;(fetchBooks as jest.Mock).mockResolvedValue(mockBookResponse)
      await mockFecthBooksByType({ type: "normal", keywords: ["keyword1"] })
      expect(fetchBooks).toHaveBeenCalledTimes(1)
      expect(setTotalBooks).toBeCalled()
    })
  })
})
