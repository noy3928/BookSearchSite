import { pipe } from "./fpUtils"
import { resolveKeyword, fetchBooksByType } from "@/services/utils"
import { Book } from "@/shared/types/book"
export const searchAndSetBooks =
  (setState: (books: Book[]) => void) =>
  (loadingDecorator: (func: Function) => (args: any) => Promise<any>) =>
  (setTotalBooks: (total: number) => void) =>
  (pageNumber: number) =>
  (keyword: string) =>
    pipe(
      resolveKeyword,
      loadingDecorator(fetchBooksByType(pageNumber)(setTotalBooks)),
      setState
    )(keyword)
