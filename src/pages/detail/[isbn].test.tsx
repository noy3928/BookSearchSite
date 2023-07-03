import { render, screen } from "@testing-library/react"
import Detail from "./[isbn]"
import { BookDetail } from "@/shared/types/book"

describe("Detail", () => {
  it("화면에 필수로 표시되어야 하는 요소들이 표시된다.", () => {
    const book: BookDetail = {
      title: "Test Title",
      subtitle: "Test Subtitle",
      authors: "Test Author",
      publisher: "Test Publisher",
      pages: "100",
      rating: "5",
      desc: "Test description",
      price: "$19.99",
      image: "https://test.com/test.png",
    }

    render(<Detail book={book} />)

    expect(screen.getByText(book.title)).toBeInTheDocument()
    expect(screen.getByText(book.subtitle)).toBeInTheDocument()
    expect(screen.getByText(`Author(s): ${book.authors}`)).toBeInTheDocument()
    expect(screen.getByText(`Publisher: ${book.publisher}`)).toBeInTheDocument()
    expect(screen.getByText(`Pages: ${book.pages}`)).toBeInTheDocument()
    expect(screen.getByText(`Rating: ${book.rating}`)).toBeInTheDocument()
    expect(screen.getByText(`Description: ${book.desc}`)).toBeInTheDocument()
    expect(screen.getByText(`Price: ${book.price}`)).toBeInTheDocument()

    const image = screen.getByRole("img") as HTMLImageElement
    expect(image.src).toBe(book.image)
  })
})
