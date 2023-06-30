import { resolveKeyword } from "../"

describe("resolveKeyword", () => {
  it('"|" 연산자가 포함되어있으면 "or" 타입을 반환해야한다.', () => {
    const result = resolveKeyword("tdd|javascript")
    expect(result).toEqual({ type: "or", keywords: ["tdd", "javascript"] })
  })

  it('"-" 연산자가 포함되어있으면 "not" 타입을 반환해야 한다.', () => {
    const result = resolveKeyword("tdd-javascript")
    expect(result).toEqual({ type: "not", keywords: ["tdd", "javascript"] })
  })

  it('어떤 연산자도 포함되어있지 않으면 "normal" 타입을 반환해야한다.', () => {
    const result = resolveKeyword("tdd")
    expect(result).toEqual({ type: "normal", keywords: ["tdd"] })
  })

  it("빈 값이면 null을 반환한다.", () => {
    const result = resolveKeyword("")
    expect(result).toEqual(null)
  })
})
