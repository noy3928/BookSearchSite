import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Book from "./Book"
import { book } from "@/shared/fixtures/book"

describe("Book", () => {
  it("책 정보들이 화면에 로드되어야한다.", () => {
    render(<Book info={book} />)

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
})
