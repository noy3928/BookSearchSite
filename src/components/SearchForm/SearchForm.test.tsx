import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import SearchForm from "./SearchForm"
import userEvent from "@testing-library/user-event"

const handleSearchBook = jest.fn()

describe("SearchForm", () => {
  it("입력폼에 검색어를 입력한 후 Enter를 누르면 handleSearchBook이 호출된다.", async () => {
    render(<SearchForm handleSearchBook={handleSearchBook} />)

    // 사용자가 텍스트를 입력합니다.
    const inputElement = screen.getByRole("textbox")
    await userEvent.type(inputElement, "tdd|javascript")

    // Enter를 누릅니다.
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" })

    // handleSearchBook 함수가 호출되었는지 확인합니다.
    expect(handleSearchBook).toHaveBeenCalled()
    expect(handleSearchBook).toHaveBeenCalledWith("tdd|javascript")
  })
})
