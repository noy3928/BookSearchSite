import React from "react"
import styled from "@emotion/styled"

interface Props {
  children: React.ReactNode
}

const Container = ({ children }: Props) => {
  return <ContainerStyle>{children}</ContainerStyle>
}

export default Container

const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: 0 auto;
  position: relative;
  background-color: #fff;
  height: 100vh;
  padding: 0 25px;
  overflow-y: auto;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  ::-webkit-scrollbar {
    display: none;
  }
`
