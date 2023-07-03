import React from "react"
import styled from "@emotion/styled"
import { theme } from "@/shared/styles/theme"

interface Props {
  handleSearchBook: (query: string) => void
  setKeyword: (keyword: string) => void
}

const SearchForm = ({ handleSearchBook, setKeyword }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim() !== "") {
      handleSearchBook(e.currentTarget.value)
      setKeyword(e.currentTarget.value)
    }
  }

  return (
    <Input
      type="text"
      placeholder="어떤 책을 찾으시나요? 키워드를 입력 후 Enter를 눌러주세요"
      onKeyDown={handleKeyDown}
    />
  )
}

export default SearchForm

const Input = styled.input`
  background-color: ${theme.colors.gray100};
  border: none;
  border-radius: 20px;
  width: 100%;
  padding: 15px 15px;
  outline: none;

  ::placeholder {
    color: ${theme.colors.gray200};
  }
`
