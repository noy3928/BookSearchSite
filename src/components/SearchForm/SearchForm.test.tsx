import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import SearchForm from "./SearchForm"
import userEvent from "@testing-library/user-event"

const handleSearchBook = jest.fn()
const setKeyword = jest.fn()

describe("SearchForm", () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it("입력폼에 검색어를 입력한 후 Enter를 누르면 handleSearchBook와 setKeyword가 호출된다.", async () => {
    render(
      <SearchForm handleSearchBook={handleSearchBook} setKeyword={setKeyword} />
    )

    // 사용자가 텍스트를 입력합니다.
    const inputElement = screen.getByRole("textbox")
    await userEvent.type(inputElement, "tdd|javascript")

    // Enter를 누릅니다.
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" })

    // handleSearchBook 함수가 호출되었는지 확인합니다.
    expect(handleSearchBook).toHaveBeenCalled()
    expect(handleSearchBook).toHaveBeenCalledWith("tdd|javascript")
    expect(setKeyword).toHaveBeenCalled()
    expect(setKeyword).toHaveBeenCalledWith("tdd|javascript")
  })

  it("검색어 없이 Enter를 누르면 handleSearchBook이 호출되지 않는다.", async () => {
    render(
      <SearchForm handleSearchBook={handleSearchBook} setKeyword={setKeyword} />
    )

    // Enter를 누릅니다.
    const inputElement = screen.getByRole("textbox")
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" })

    // handleSearchBook 함수가 호출되지 않았는지 확인합니다.
    expect(handleSearchBook).not.toHaveBeenCalled()
    expect(setKeyword).not.toHaveBeenCalled()
  })
})
