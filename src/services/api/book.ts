import apiInstance from "@/services/api/config"

export const fetchBooks = async (keyword: string, pageNumber: number) => {
  const res = await apiInstance.get(`/search/${keyword}/${pageNumber}`)

  return res.data
}

export const fetchBook = async (isbn: string) => {
  const res = await apiInstance.get(`/books/${isbn}`)

  return res.data
}
