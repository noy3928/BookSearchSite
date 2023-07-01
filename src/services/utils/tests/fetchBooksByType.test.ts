import { fetchBooksByType } from "../"
import { fetchBooks } from "../../api"
import { filterKeyword } from "../filterKeyword"
import { Book } from "@/shared/types/book"

jest.mock("../../api")
jest.mock("../filterKeyword")

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
      ;(fetchBooks as jest.Mock).mockResolvedValue([])
      await fetchBooksByType({ type: "or", keywords: ["keyword1", "keyword2"] })
      expect(fetchBooks).toHaveBeenCalledTimes(2)
    })
  })

  describe("type이 'not'이면", () => {
    it("filter된 결과를 반환한다.", async () => {
      ;(fetchBooks as jest.Mock).mockResolvedValue([
        { title: "keyword1" },
        { title: "keyword2" },
      ])
      ;(filterKeyword as jest.Mock).mockImplementation(
        (keyword: string, books: Book[]) => books
      )
      await fetchBooksByType({
        type: "not",
        keywords: ["keyword1", "keyword2"],
      })
      expect(fetchBooks).toBeCalled()
      expect(filterKeyword).toBeCalled()
    })
  })

  describe("type이 'normal'이면", () => {
    it("해당 키워드로 fetchBooks를 호출한다.", async () => {
      ;(fetchBooks as jest.Mock).mockResolvedValue([])
      await fetchBooksByType({ type: "normal", keywords: ["keyword1"] })
      expect(fetchBooks).toHaveBeenCalledTimes(1)
    })
  })
})
