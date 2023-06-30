import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Home from "./index"

describe("Home", () => {
  test("renders Home component", () => {
    render(<Home />)

    expect(screen.getByText("This is Home!")).toBeInTheDocument()
  })
})
