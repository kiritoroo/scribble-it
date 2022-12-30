import React from "react";
import { css } from "@emotion/css";
import { motion, Variants } from "framer-motion";

export const Loading = () => {
  return (
    <motion.div 
      className={sLoader}
      initial="enter"
      animate="hidden"
      exit="exit"
      variants={vLoader}
    />
  )
}

const trans = { duration: 0.8, ease: "easeInOut" };
const vLoader: Variants = {
  enter: { opacity: 1, x: "-50%",  y: 0, scale: 1, transition: trans  },
  hidden: { opacity: 0, x: 0,  y: 0, scale: 1.5, zIndex: -9999, transition: trans },
  exit: { },
}

const sLoader = css`
  position: absolute;
  display: block;
  width: 100vw;
  height: 100vw;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: var(--c-green-200);
  z-index: 99999;
  border-radius: 100%;
`