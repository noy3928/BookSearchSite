import { fetchBooks } from "@/services/api"
import { filterKeyword } from "@/services/utils"
import { SearchType, BookResponse, Book } from "@/shared/types/book"

export const fetchBooksByType = async ({ type, keywords }: SearchType) => {
  if (type === null) return null
  let res: BookResponse = {
    books: [],
    error: "",
    page: "",
    total: "",
  }

  switch (type) {
    case "or":
      const promises = keywords.map(keyword => fetchBooks(keyword, 1))
      const results = await Promise.all(promises)
      res = results.reduce(
        (acc: BookResponse, cur: BookResponse, idx) => {
          if (idx === 0) {
            acc.page = cur.page
            acc.total = cur.total
          }
          acc.books = [...acc.books, ...cur.books]
          return acc
        },
        { ...res }
      )
      break
    case "not":
      res = await fetchBooks(keywords[0], 1)
      const books = filterKeyword(keywords[1], res.books)
      res = { ...res, books }
      break
    case "normal":
      res = await fetchBooks(keywords[0], 1)
      break
  }

  return res.books
}
