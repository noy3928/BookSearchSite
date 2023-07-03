import React from "react"

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
    <div>
      <input
        type="text"
        placeholder="검색어를 입력하세요."
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}

export default SearchForm
