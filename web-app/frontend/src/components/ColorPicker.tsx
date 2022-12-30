import React, { useState } from "react";
import { css } from "@emotion/css";
import { motion, Variants } from "framer-motion";
import { SingleColor } from "./SingleColor";

interface Props {
  pickColor: string;
  setPickColor: React.Dispatch<React.SetStateAction<string>>;
}

const trans = { duration: 1, ease: "easeInOut" };
const variants: Variants = {
  hidden: { opacity: 0, x: "-50%" },
  enter: { opacity: 1, x: "50%", transition: trans },
  exit: { opacity: 0, x: "-50%" },
};

export const ColorPicker = ({ pickColor, setPickColor }: Props) => {
  const colorList = [
    'rgb(227, 227, 227)',
    'rgb(80, 80, 80)',
    'rgb(237, 168, 168)',
    'rgb(220, 123, 123)',
    'rgb(176, 236, 161)',
    'rgb(142, 220, 123)',
    'rgb(123, 220, 181)',
    'rgb(123, 196, 220)',
    'rgb(98, 181, 208)',
  ]

  return (
    <>
      <motion.div 
        className={sWrapper}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        <div className={sColorList}>
          { colorList.map((color) => (
            <SingleColor
              key={color}
              color={color} 
              pickColor={pickColor}
              setPickColor={setPickColor}
            />
          ))}
        </div>
      </motion.div>
    </>
  )
}

const sWrapper = css`
  position: absolute;
  left: 2%;
  top: 20%;
  transform: translateY(20%);
  width: 80px;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
`

const sColorList = css`
  padding: 20px 5px 20px 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`