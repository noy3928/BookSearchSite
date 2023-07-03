import React, { forwardRef } from "react"
import { Book as BookType } from "@/shared/types/book"
import Book from "@/components/Book/Book"

interface Props {
  books: BookType[]
}

const BookList = forwardRef<HTMLDivElement, Props>(({ books }, ref) => {
  return (
    <>
      {books.map((book, index) => {
        if (books.length > 0 && books.length === index + 1) {
          return (
            <div key={book.isbn13 + index} ref={ref} data-testid="last-book">
              <Book info={book} />
            </div>
          )
        } else {
          return <Book key={book.isbn13 + index} info={book} />
        }
      })}
    </>
  )
})

BookList.displayName = "BookList"

export default BookList
