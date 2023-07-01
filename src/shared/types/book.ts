export type Book = {
  title: string
  subtitle: string
  image: string
  url: string
  id: string
}

export interface SearchType {
  type: "or" | "not" | "normal" | null
  keywords: string[]
}
