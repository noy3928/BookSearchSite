import React from "react"
import { Book as BookType } from "@/shared/types/book"
import Book from "@/components/Book/Book"

interface Props {
  books: BookType[]
}

const BookList = ({ books }: Props) => {
  return (
    <div>
      {books.map(book => (
        <Book key={book.isbn13} info={book} />
      ))}
    </div>
  )
}

export default BookList
