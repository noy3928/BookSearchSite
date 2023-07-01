import React from "react"
import { pipe } from "./fpUtils"
import { resolveKeyword, fetchBooksByType } from "@/services/utils"
import { Book } from "@/shared/types/book"

export const searchAndSetBooks =
  (setState: React.Dispatch<React.SetStateAction<Book[]>>) =>
  (keyword: string) =>
    pipe(resolveKeyword, fetchBooksByType, setState)(keyword)
