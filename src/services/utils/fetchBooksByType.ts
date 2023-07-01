import { fetchBooks } from "@/services/api"
import { filterKeyword } from "@/services/utils"
import { SearchType, Book } from "@/shared/types/book"

export const fetchBooksByType = async ({ type, keywords }: SearchType) => {
  if (type === null) return null
  let books: Book[] = []

  switch (type) {
    case "or":
      const promises = keywords.map(keyword => fetchBooks(keyword, 1))
      const results = await Promise.all(promises)
      books = results.flat()
      break
    case "not":
      books = await fetchBooks(keywords[0], 1)
      books = filterKeyword(keywords[1], books)
      break
    case "normal":
      books = await fetchBooks(keywords[0], 1)
      break
  }

  return books
}
