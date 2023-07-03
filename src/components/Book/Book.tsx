import React from "react"
import { Book } from "@/shared/types/book"
import Link from "next/link"
import styled from "@emotion/styled"

interface Props {
  info: Book
}

const BookComponent = ({ info }: Props) => {
  return (
    <BookWrapper data-testid="book">
      <Link
        href={`/detail/${info.isbn13}`}
        title={info.title}
        style={{ textDecoration: "none" }}
      >
        <BookCover src={info.image} alt={info.title} />
        <BookInfo>
          <BookTitle>{info.title}</BookTitle>
          <BookSubtitle>{info.subtitle}</BookSubtitle>
        </BookInfo>
      </Link>
    </BookWrapper>
  )
}

export default BookComponent

const BookWrapper = styled.div`
  flex-basis: 45%;
  margin: 20px 0;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
    transform: scale(1.01);
  }
`

const BookCover = styled.img`
  width: 100%;
  height: auto;
`

const BookInfo = styled.div`
  padding: 15px;
`

const BookTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`

const BookSubtitle = styled.p`
  margin: 0;
  font-size: 16px;
  color: #888;
`
