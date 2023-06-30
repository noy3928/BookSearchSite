import { filterKeyword } from "../"
import { books } from "@/shared/fixtures/book"

describe("filterKeyword", () => {
  it("매칭되는 키워드가 없으면 빈 배열을 반환한다.", () => {
    const filteredBooks = filterKeyword("foo", books)
    expect(filteredBooks).toEqual([])
  })

  it("매칭되는 키워드가 있는 값만 반환한다.", () => {
    const filteredBooks = filterKeyword("Mongo", books)
    expect(filteredBooks).toEqual([books[0]])
  })
})
