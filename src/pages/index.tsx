import React, { useState, useEffect } from "react"
import BookList from "@/components/BookList/BookList"
import SearchForm from "@/components/SearchForm/SearchForm"

import { searchAndSetBooks, loadingDecorator } from "@/services/utils"
import { Book } from "@/shared/types/book"
import { useIntersectionObserver } from "@/services/hooks/useIntersectionObserver"

// import styled from "@emotion/react"
import styled from "@emotion/styled"

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
    <ContainerStyle>
      <SearchForm
        handleSearchBook={handleSearchBook(pageNumber)}
        setKeyword={setKeyword}
      />
      <BookList books={books} ref={ref} />
      {isLoading && <div>로딩중...</div>}
    </ContainerStyle>
  )
}

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  height: 100vh;
  padding: 20px 20px;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    z-index: -1;
  }
`
