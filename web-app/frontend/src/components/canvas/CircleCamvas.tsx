import React, { useRef, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { drawLine } from "@util/drawUtil";
import { tCoordinates2D } from "@type/index";

export const CircleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D>()

  useEffect(() => {
    let animationFrameId: number;
    let speed: tCoordinates2D = { x: 0, y: 0};

    const drawCircle = (C: CanvasRenderingContext2D, size: number, offsetX: number, offsetY: number) => {
      C.beginPath();
      C.lineWidth = 0.2;
      C.strokeStyle ='#222222';
      C.save()
      C.beginPath()
      C.arc(500+offsetX, -offsetY, size, 0, Math.PI * 2, false)
      C.stroke()
      C.restore()
      C.closePath()
    }

    const draw = () => {
      if (context) {
        const canvasWidth = context.canvas.width;
        const canvsHeight = context.canvas.height;
        const countLine = 3;
        const sizeCircle = 200;
        const space: tCoordinates2D = { 
          x: 640/countLine + sizeCircle-sizeCircle/20,
          y: 400/countLine + sizeCircle-sizeCircle/20
        };
        context.clearRect(0, 0, canvasWidth, canvsHeight);
        for (let i=-countLine-10; i<countLine+10;i++) {
          drawCircle(context, sizeCircle, space.x*i + speed.x, space.y + speed.y)
          for(let j =-countLine-10; j < countLine+10; j++) {
            const spaceVertical = 400*j
            drawCircle(context, sizeCircle, space.x*i + speed.x, space.y + spaceVertical + speed.y)
          }
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
  background: #fbf6f6;
`