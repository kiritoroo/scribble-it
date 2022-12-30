import React from "react";
import { css } from "@emotion/css";
import { useLocation } from "react-router-dom";
import { motion, Variants } from "framer-motion";

interface Props {
  digits: Array<number | string>
  pred: Array<number>
}

const trans = { duration: 1, ease: "easeInOut" };
const variants: Variants = {
  hidden: { opacity: 0, x: "100%" },
  enter: { opacity: 1, x: "0%", transition: trans },
  exit: { opacity: 0, x: "100%" },
};

export const DigitList = ({ digits, pred }: Props) => {
  const location = useLocation()

  return (
    <motion.div
      className={sWrapper}
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      <div className={sDigitListContainer}>
        { digits.map((digit, i) => (
          <div className={sDigitWrapper} key={i}>
            <div className={sDigit}>{ digit }</div>
            <div className={sPercent(pred[i]*100)}></div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const sWrapper = css`
  position: absolute;
  right: 5%;
  top: 20%;
  transform: translateY(20%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: var(--b-md) solid black;
  border-radius: 50px;
  background-color: var(--c-white);
  padding: 2em 1.5em;
`

const sDigitListContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1em;
`

const sDigitWrapper = css`
  background: #f8fdf7;
  transition: .3s ease-out;
  width: 400px;
  display: flex;
  flex-direction: row;
`
const sDigit = css`
  font-size: 1.5em;
  font-weight: 400;
  width: 20px;
  padding: 10px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const sPercent = (pred: number) => css`
  font-size: 1em;
  font-weight: 400;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0;
  transition: .3s ease-in;
  background: #c8f7bf;
  width: ${pred}%;
  margin-left: 20px;
  text-align: right;
  padding: 10px 5px;
  border: 2px solid black;
`