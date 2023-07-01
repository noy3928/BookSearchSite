import { filterKeyword } from "../"
import { books } from "@/shared/fixtures/book"

describe("filterKeyword", () => {
  it("매칭되는 키워드를 제외한 값만 반환한다.", () => {
    const filteredBooks = filterKeyword("Mongo", books)
    expect(filteredBooks).toEqual([books[1], books[2], books[3]])
  })
})
