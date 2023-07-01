export type Book = {
  image: string
  isbn13: string
  price: string
  subtitle: string
  title: string
  url: string
}

export type BookResponse = {
  books: Book[]
  error: string
  page: string
  total: string
}

export interface SearchType {
  type: "or" | "not" | "normal" | null
  keywords: string[]
}
