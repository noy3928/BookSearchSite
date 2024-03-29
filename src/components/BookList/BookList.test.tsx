import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BookList from "./BookList"
import { books } from "@/shared/fixtures/book" // 책들의 배열을 import 합니다.

describe("BookList", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("각 책 정보들이 화면에 로드되어야한다.", () => {
    render(<BookList books={books} />)

    books.forEach(book => {
      expect(screen.getByText(book.title)).toBeInTheDocument()
    })

    const bookElements = screen.getAllByTestId("book")
    expect(bookElements).toHaveLength(books.length)
  })

  it("ref가 마지막 자식에 올바로 등록되어야 한다.", () => {
    const ref = { current: null }
    render(<BookList books={books} ref={ref} />)

    expect(ref.current).toBe(screen.getByTestId("last-book"))
  })
})
