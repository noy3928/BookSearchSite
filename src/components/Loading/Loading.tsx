import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"
import React from "react"
import { theme } from "@/shared/styles/theme"

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const StyledLoader = styled.div`
  margin: 20px 0;
  border: 16px solid #f3f3f3;
  border-top: 16px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
  flex-shrink: 0;
`

const Loader = () => {
  return <StyledLoader />
}

export default Loader
