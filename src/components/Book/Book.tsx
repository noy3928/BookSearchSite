import React from "react"
import { Book } from "@/shared/types/book"
import Link from "next/link"

interface Props {
  info: Book
}

const Book = ({ info }: Props) => {
  return (
    <Link href={`/detail/${info.isbn13}`} title={info.title} data-testid="book">
      <img src={info.image} alt={info.title} />
      <div>
        <h3>{info.title}</h3>
        <p>{info.subtitle}</p>
      </div>
    </Link>
  )
}

export default Book
