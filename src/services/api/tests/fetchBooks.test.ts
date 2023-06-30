import { fetchBooks } from "./utils" // 실제 모듈 경로로 변경해주세요.
import { books } from "@/shared/fixtures/book"
import axios, { AxiosResponse } from "axios"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("fetchBooks", () => {
  it("keyword와 pageNumber를 이용해서 books를 fetch한다.", async () => {
    const resp = { data: books }
    mockedAxios.get.mockResolvedValue(resp as AxiosResponse)

    const result = await fetchBooks("keyword", 1)
    expect(result).toEqual(books)
    expect(axios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { q: "keyword", page: 1 },
    })
  })

  it("fetch 요청에 에러가 발생하면, 에러를 내뱉는다.", async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("API request failed"))
    )

    await expect(fetchBooks("keyword", 1)).rejects.toThrow("API request failed")
  })
})
