import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { drawLine } from "@util/drawUtil";
import { tCoordinates2D } from "@type/index";

export const LineCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D>()

  useEffect(() => {
    let animationFrameId: number;
    let speed: tCoordinates2D = { x: 0, y: 0};

    const drawLine = (C: CanvasRenderingContext2D, offsetX: number, offsetY: number) => {
      C.strokeStyle ='#222222';

      C.stroke()
      C.beginPath();
      C.lineWidth = 0.1
      C.moveTo(offsetX, 0)
      C.lineTo(offsetX, C.canvas.height)
      C.closePath()

      C.stroke()
      C.beginPath();
      C.lineWidth = 0.1
      C.moveTo(0, -offsetY)
      C.lineTo(C.canvas.width, -offsetY)
      C.closePath()
  
      C.stroke()
      C.beginPath()
      C.lineWidth = 0.1
      C.moveTo(offsetX-C.canvas.width*2, -offsetY-C.canvas.height*2);
      C.lineTo(offsetX+C.canvas.width*2, -offsetY+C.canvas.height*2)
      C.closePath()
    }

    const draw = () => {
      if (context) {
        const canvasWidth = context.canvas.width;
        const canvsHeight = context.canvas.height;
        const countLine = 3;
        const space: tCoordinates2D = { 
          x: canvasWidth / countLine,
          y: canvsHeight / countLine
        };
        context.clearRect(0, 0, canvasWidth, canvsHeight);
        for (let i=-countLine-10; i<countLine+10;i++) {
          drawLine(context, space.x*i + speed.x, space.y*i + speed.y)
        }
      }
    }

    const render = () => {
      if (context) {
        context.canvas.width  = window.innerWidth;
        context.canvas.height = window.innerHeight;
        speed = { x: speed.x+1, y: speed.y+1}
        animationFrameId = window.requestAnimationFrame(render)
        if (speed.x > window.innerWidth) speed = { x: -window.innerWidth, y: -window.innerHeight}
        draw()
      }
    }

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d')
      if (renderCtx) {
        setContext(renderCtx);
        render()
      }
    }
  
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [context])

  return (
    <>
      <canvas
        ref={canvasRef}
        className={sCanvas}
      />
    </>
  )
}

const sCanvas = css`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width:  100%;
  height: 100%;
  margin: 0;
  z-index: -5;
  background: #edf3f1;
`