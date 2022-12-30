import React, { useEffect, useRef, useState} from "react";
import { css } from '@emotion/css'
import { motion, Variants } from "framer-motion";

import { tCoordinates2D } from "@type/index";
import { drawLine  } from "@util/drawUtil";
import { SketchButton } from "@comp/button/SketchButton";
import { ReloadButton } from "@comp/button/ReloadButton";
import { DownloadButton } from "@comp/button/DownloadButton";
import { ColorPicker } from "@comp/ColorPicker";
import { SizeRange } from "@comp/SizeRange";
import { DigitList } from "@comp/DigitList";

interface Props {
  color: string;
}

const digits = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]

const characters = [
  "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"
]

const trans = { duration: 0.5, ease: "easeInOut" };
const variants: Variants = {
  hidden: { opacity: 0, y: "-0%" },
  enter: { opacity: 1, y: "0%", transition: trans },
  exit: { opacity: 0, y: "-0%" },
};

export const DrawCanvas = ({ color }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D>()
  const [lineColor, setLineColor] = useState('rgb(80, 80, 80)')
  const [lineSize, setLineSize] = useState(15)
  const [pred, setPrd] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    let mouseDown: boolean = false;
    let start: tCoordinates2D = { x: 0, y: 0};
    let end: tCoordinates2D = { x: 0, y: 0};

    const handleMouseDown = (e: MouseEvent) => {
      mouseDown = true;
      const canvasOffsetLeft = canvasRef.current ? canvasRef.current.getBoundingClientRect().left : 0;
      const canvasOffstTop = canvasRef.current ? canvasRef.current.getBoundingClientRect().top : 0;

      start = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffstTop
      }

      end = {
        x: e.clientX - canvasOffsetLeft,
        y: e.clientY - canvasOffstTop
      }
    }
  
    const handleMouseUp = (e: MouseEvent) => {
      mouseDown = false;
    }
    
    const handleMousLeave = (e: MouseEvent) => {
      mouseDown = false;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (mouseDown && context) {
        const canvasOffsetLeft = canvasRef.current ? canvasRef.current.getBoundingClientRect().left : 0;
        const canvasOffstTop = canvasRef.current ? canvasRef.current.getBoundingClientRect().top : 0;
  
        start = {
          x: end.x,
          y: end.y
        };

        end = {
          x: e.clientX - canvasOffsetLeft,
          y: e.clientY - canvasOffstTop
        };
        
        drawLine({ 
          c: context, 
          from: start, 
          to: end,
          color: lineColor,
          size: lineSize
        });
      }
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d')
      if (renderCtx) {
        canvasRef.current.addEventListener('mousedown', handleMouseDown);
        canvasRef.current.addEventListener('mouseup', handleMouseUp);
        canvasRef.current.addEventListener('mousemove', handleMouseMove);
        canvasRef.current.addEventListener('mouseout', handleMousLeave);
        setContext(renderCtx);
      }
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('mouseout', handleMousLeave);
      }
    }
  }, [context, lineColor, lineSize]);

  return (
    <>
      <motion.div 
        className={sWrapper}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
      >
        <div className={sInner}>
          <canvas 
            ref={canvasRef}
            className={sCanvas(color)}
            width={500}
            height={500}
          />
          <div className={sGrid}>
            <SketchButton context={context!} setPred={setPrd}/>
            <ReloadButton context={context!}/>
          </div>
        </div>
      </motion.div>
      <ColorPicker pickColor={lineColor} setPickColor={setLineColor}/>
      <SizeRange lineSize={lineSize} setLineSize={setLineSize}/>
      { location.pathname === "/digits"
          ? <DigitList digits={digits} pred={pred}/> 
          : <DigitList digits={characters} pred={pred}/> 
      }
      <DownloadButton context={context!}/>
    </>
  )
}

const sWrapper = css`
  transition: 0.3s ease;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1em;
`

const sInner = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: var(--b-md) solid black;
  border-radius: 50px;
  background-color: var(--c-white);
  padding: 1.5em 1em;
	&::after {
		content: "";
		display: block;
		position: absolute;
		z-index: -1;
		width: 95%;
		height: 100%;
		bottom:  -20px;
		left: calc(50% - 45.5%);
    border-radius: 50px;
		border: 2px solid black;
		background-color: var(--c-pink-200);
	}
`

const sCanvas = (canvas_color: string) => css`
  border-radius: 50px;
  background-color: ${canvas_color};
  z-index: 99;
  &:hover {
    cursor: cell;    
  }
`

const sGrid = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
  gap: 1.25em;
`