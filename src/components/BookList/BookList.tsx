import React, { forwardRef } from "react"
import { Book as BookType } from "@/shared/types/book"
import Book from "@/components/Book/Book"

import styled from "@emotion/styled"

interface Props {
  books: BookType[]
}

const BookList = forwardRef<HTMLDivElement, Props>(({ books }, ref) => {
  return (
    <BookListContainer>
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
    </BookListContainer>
  )
})

BookList.displayName = "BookList"

export default BookList

const BookListContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`
