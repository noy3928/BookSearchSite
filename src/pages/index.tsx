import React, { useState, useEffect } from "react"
import BookList from "@/components/BookList/BookList"
import SearchForm from "@/components/SearchForm/SearchForm"
import Container from "@/components/Container/Container"
import Loading from "@/components/Loading/Loading"

import { searchAndSetBooks, loadingDecorator } from "@/services/utils"
import { Book } from "@/shared/types/book"
import { useIntersectionObserver } from "@/services/hooks/useIntersectionObserver"

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [keyword, setKeyword] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [totalBooks, setTotalBooks] = useState<number>(0)
  const isNextPage = books.length > 0 && books.length < totalBooks

  const handleSearchBook = searchAndSetBooks(newBooks =>
    setBooks([...books, ...newBooks])
  )(loadingDecorator(setIsLoading))(setTotalBooks)

  const ref = useIntersectionObserver((entry, observer) => {
    observer.unobserve(entry.target)
    if (isNextPage && !isLoading)
      (function fetchNextPage() {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      })()
  })

  useEffect(() => {
    if (pageNumber > 1 && !isLoading && isNextPage) {
      console.log(pageNumber, keyword)
      handleSearchBook(pageNumber)(keyword)
    }
  }, [pageNumber])

  return (
    <Container>
      <SearchForm
        handleSearchBook={handleSearchBook(pageNumber)}
        setKeyword={setKeyword}
      />
      <BookList books={books} ref={ref} />
      {isLoading && <Loading />}
    </Container>
  )
}
