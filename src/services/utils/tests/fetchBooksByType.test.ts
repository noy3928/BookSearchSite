import { fetchBooksByType, filterKeyword } from "./utils" // 실제 모듈 경로로 변경해주세요.
import { fetchBooks } from "../../api"
import { Book } from "@/shared/types/book"

describe("fetchBooksByType", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("type이 null이면", () => {
    it("null을 반환한다.", async () => {
      const result = await fetchBooksByType({ type: null, keywords: [] })
      expect(result).toBeNull()
    })
  })

  describe("type이 'or'이면", () => {
    it("2번 fetchBooks를 호출한다.", async () => {
      const mockFetch = fetchBooks.mockResolvedValue([])
      await fetchBooksByType({ type: "or", keywords: ["keyword1", "keyword2"] })
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  describe("type이 'not'이면", () => {
    it("filter된 결과를 반환한다.", async () => {
      const mockFetch = fetchBooks.mockResolvedValue([
        { title: "keyword1" },
        { title: "keyword2" },
      ])
      const mockFilter = filterKeyword.mockImplementation(
        (keyword: string, books: Book[]) => books
      )
      await fetchBooksByType({
        type: "not",
        keywords: ["keyword1", "keyword2"],
      })
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFilter).toHaveBeenCalledTimes(1)
    })
  })

  describe("type이 'normal'이면", () => {
    it("해당 키워드로 fetchBooks를 호출한다.", async () => {
      const mockFetch = fetchBooks.mockResolvedValue([])
      await fetchBooksByType({ type: "normal", keywords: ["keyword1"] })
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })
})
