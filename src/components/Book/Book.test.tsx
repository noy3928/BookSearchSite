import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Book from "./Book"
import { book } from "@/shared/fixtures/book"

describe("Book", () => {
  beforeEach(() => render(<Book info={book} />))

  it("책 정보들이 화면에 로드되어야한다.", () => {
    expect(
      screen.getByText("MongoDB in Action, 2nd Edition")
    ).toBeInTheDocument()
    expect(screen.getByText("Covers MongoDB version 3.0")).toBeInTheDocument()
    expect(
      screen.getByText("https://itbook.store/img/books/9781617291609.png")
    ).toBeInTheDocument()
    expect(
      screen.getByText("https://itbook.store/books/9781617291609")
    ).toBeInTheDocument()
  })

  it("Book 컴포넌트를 클릭하면, detail 페이지로 이동한다", () => {
    const linkElement = screen.getByRole("link", { name: book.title })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement.getAttribute("href")).toBe(`/detail/${book.id}`)
  })
})
