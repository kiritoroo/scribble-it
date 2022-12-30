import React from "react";
import { css } from "@emotion/css";

interface Props {
  color: string;
  pickColor: string;
  setPickColor: React.Dispatch<React.SetStateAction<string>>
}

export const SingleColor = ({ color, pickColor, setPickColor}: Props) => {
  const onClickHandle = () => {
    setPickColor(color);
  }

  return (
    <a 
      className={sColorContainer(color, pickColor)}
      style={{ background: color }}
      onClick={onClickHandle}
    />
  )
}

const sColorContainer = (color: string, pickColor: string) => css`
  height: 40px;
  width: 40px;
  cursor: pointer;
  margin: 10px 5px 10px 5px;
  border-radius: 6px;
  transition: 0.2s ease;
  transition: scale 0.5s ease;
  &:active {
    scale: 0.8;
  }
  ${pickColor === color &&
  `
    border: 2px solid black;
    scale: 1.25;
  `}
`