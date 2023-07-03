import { GetServerSideProps } from "next"
import { fetchBook } from "@/services/api"
import { BookDetail } from "@/shared/types/book"

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
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>Author(s): {authors}</p>
      <p>Publisher: {publisher}</p>
      <p>Pages: {pages}</p>
      <p>Rating: {rating}</p>
      <p>Description: {desc}</p>
      <p>Price: {price}</p>
      <img src={image} alt={title} />
    </div>
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
