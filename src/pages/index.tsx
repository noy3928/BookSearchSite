import React, { useState } from "react"
import BookList from "@/components/BookList/BookList"
import SearchForm from "@/components/SearchForm/SearchForm"

import { searchAndSetBooks } from "@/services/utils"
import { Book } from "@/shared/types/book"

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const handleSearchBook = searchAndSetBooks(setBooks)

  return (
    <div>
      <SearchForm handleSearchBook={handleSearchBook} />
      <BookList books={books} />
    </div>
  )
}
