import React, { useEffect, useRef } from "react";
import { css } from "@emotion/css";
import { motion, Variants } from "framer-motion";

interface Props {
  context: CanvasRenderingContext2D;
}

const trans = { duration: 1, ease: "easeInOut" };
const variants: Variants = {
  hidden: { opacity: 0, x: "50%" },
  enter: { opacity: 1, x: "0%", transition: trans },
  exit: { opacity: 0, x: "50%" },
};

export const DownloadButton = ({ context }: Props) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<HTMLSpanElement>(null)

  const downloadHandle = () => {
    const anchor = document.createElement('a');
    const date = new Date(Date.now())
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const yeath = date.getFullYear();
    const time = date.getTime().toString();
    anchor.download = 'scribble_it_'+day+month+yeath+'_'+time+'.png';
    anchor.href = context.canvas.toDataURL();
    anchor.click();
  }

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      if (buttonRef.current && effectRef.current) {
        const offsetLeft = buttonRef.current.getBoundingClientRect().left
        const offsetTop = buttonRef.current.getBoundingClientRect().top
        const relX = e.clientX - offsetLeft
        const relY = e.clientY - offsetTop
        effectRef.current.style.top = relY + 'px';
        effectRef.current.style.left = relX + 'px';
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (buttonRef.current && effectRef.current) {
        const offsetLeft = buttonRef.current.getBoundingClientRect().left
        const offsetTop = buttonRef.current.getBoundingClientRect().top
        const relX = e.clientX - offsetLeft
        const relY = e.clientY - offsetTop
        effectRef.current.style.top = relY + 'px';
        effectRef.current.style.left = relX + 'px';
      }
    }

    const addEventListeners = () => {
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", handleMouseEnter);
        buttonRef.current.addEventListener("mouseout", handleMouseOut);
      }
    }

    const removeEventListeners = () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseenter", handleMouseEnter);
        buttonRef.current.removeEventListener("mouseout", handleMouseOut);
      }
    }

    addEventListeners();
    return () => removeEventListeners();
  }, [buttonRef.current, effectRef.current])

  return (
    <>
      <motion.div 
        ref={buttonRef} className={sWrapper} 
        onClick={downloadHandle}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        <a className={sInner}>
          <div className={sTitle}>
            Lưu ảnh
          </div>
          <div className={sEffectWrapper}>
            <span ref={effectRef} className={sEffect}/>
          </div>
          <div className={sIcon}>
            <svg viewBox="0 0 24 24">
              <path d="M 4,12 C 4,12 12,20 12,20 C 12,20 20,12 20,12"></path>
            </svg>
          </div>
        </a>
      </motion.div>
    </>
  )
}

const sWrapper = css`
  position: absolute;
  right: 2%;
  bottom: 0;
  height: 80px;
  width: 200px;
  margin-top: 2.5em;
  margin-bottom: 1em;
  transition: 0.1s ease;
  z-index: 1;
  &:hover {
    cursor: pointer;
    a::after {
      background-color: var(--c-pink-300);
    }
    span {
      width: 550px;
      height: 550px;
    }
  }
  &:active {
    transform: scale(0.9);
  }
`

const sInner = css`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: var(--b-md) solid black;
  border-radius: 25px;
  background-color: var(--c-white);
  transition: 0.2s ease;
  &:active {
    & > :nth-child(3) {
    background-color: var(--c-pink-300);
    }
  }
`

const sTitle = css`
  user-select: none;
  pointer-events: none;
  font-size: 1.25em;
  font-weight: 500;
  line-height: 20px;
  padding: 0.875em 1em;
  z-index: 1;
`

const sEffectWrapper = css`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 25px;
  overflow: hidden;
`

const sEffect = css`
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--c-pink-100);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.2s ease;
`

const sIcon = css`
  position: relative;
  width: 60px;
  height: 60px;
  background: var(--c-pink-200);
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border-left: 3px solid black;
  &::before {
    content: "";
    display: block;
    position: absolute;
    border-radius: 1px;
    width: 2px;
    top: 50%;
    left: 50%;
    height: 17px;
    margin: -9px 0 0 -1px;
    background: var(--c-white);
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 60px;
    height: 60px;
    transform-origin: 50% 0;
    border-radius: 0 0 80% 80%;
    background: var(--c-white);
    top: 0;
    left: 0;
    transform: scaleY(0);
  }

  svg {
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    left: 50%;
    top: 50%;
    margin: -9px 0 0 -10px;
    fill: none;
    z-index: 1;
    stroke-width: 2px;
    stroke: var(--c-white);
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`