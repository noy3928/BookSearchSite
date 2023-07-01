import { Book } from "@/shared/types/book"

export const filterKeyword = (keyword: string, books: Book[]) => {
  const regex = new RegExp(keyword, "i")
  const filteredBooks = books.filter(book => !regex.test(book.title))

  return filteredBooks
}
