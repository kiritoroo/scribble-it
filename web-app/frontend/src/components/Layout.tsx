import React from "react";
import { css } from "@emotion/css";

import { Loading } from "./Loading";
import { Header } from "@comp/Header"
import { Container } from "@comp/Container"
import { Cursor } from "@comp/Cursor"

interface Props {
  children: React.ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props

  return (
    <>
      <Container>
        <Header/>
        <div className={sWrapperContent}>
          { children }
        </div>
      </Container>
      <Cursor/>
    </>
  )
}

const sWrapperContent = css`
  width: 100%;
  height: 100%;
  margin-top: 2em;
`