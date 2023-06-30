import React from "react"

interface Props {
  handleSearchBook: (query: string) => void
}

const SearchForm = ({ handleSearchBook }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchBook(e.currentTarget.value)
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
