export const resolveKeyword = (keyword: string) => {
  if (keyword.includes("|")) {
    return { type: "or", keywords: keyword.split("|") }
  }

  if (keyword.includes("-")) {
    return { type: "not", keywords: keyword.split("-") }
  }

  if (keyword) {
    return { type: "normal", keywords: [keyword] }
  }

  return null
}
