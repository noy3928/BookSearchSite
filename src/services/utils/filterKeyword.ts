import { Book } from "@/shared/types/book"

export const filterKeyword = (keyword: string, books: Book[]) => {
  const filteredBooks = books.filter(book => {
    return book.title.includes(keyword)
  })

  return filteredBooks
}
