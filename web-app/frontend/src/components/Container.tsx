import React, { Children } from "react";
import { css } from '@emotion/css'

interface Props {
  children: React.ReactNode;
}

export const Container = (props: Props) => {
  const { children } = props

  return (
    <>
      <div className={sContainer}>
        { children }
      </div>
    </>
  )
}

const sContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
	display: flex;
  flex-direction: column;
	align-items: center;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 15px;
  height: 95vh;
  width: 95vw;
  margin: auto;
  border: 4px solid black;
  z-index: 999;
  overflow: hidden;
`