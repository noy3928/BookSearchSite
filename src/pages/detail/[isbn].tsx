import { GetServerSideProps } from "next"
import { fetchBook } from "@/services/api"
import { BookDetail } from "@/shared/types/book"
import Container from "@/components/Container/Container"
import styled from "@emotion/styled"

export type Props = {
  book: BookDetail
}

const Detail = ({ book }: Props) => {
  const {
    title,
    subtitle,
    authors,
    publisher,
    pages,
    rating,
    desc,
    price,
    image,
  } = book

  return (
    <Container>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      <Image src={image} alt={title} />
      <InfoContainer>
        <BookInfo>
          <strong>Author(s):</strong> {authors}
        </BookInfo>
        <BookInfo>
          <strong>Publisher:</strong> {publisher}
        </BookInfo>
        <BookInfo>
          <strong>Pages:</strong> {pages}
        </BookInfo>
        <BookInfo>
          <strong>Rating:</strong> {rating}
        </BookInfo>
        <BookInfo>
          <strong>Description:</strong> {desc}
        </BookInfo>
        <BookInfo>
          <strong>Price:</strong> {price}
        </BookInfo>
      </InfoContainer>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { isbn } = context.params as { isbn: string }
  const book = await fetchBook(isbn as string)

  return {
    props: {
      book,
    },
  }
}

export default Detail

const Title = styled.h1`
  margin-top: 25px;
  font-size: 40px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`

const Subtitle = styled.h2`
  font-size: 20px;
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`

const Image = styled.img`
  width: 70%;
  margin: 20px auto;
  display: block;
`

const BookInfo = styled.p`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
  text-align: left;
`

const InfoContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
`
