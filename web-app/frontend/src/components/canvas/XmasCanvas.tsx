import React, { useRef, useState, useEffect, Suspense } from "react";
import * as $ from 'three';
import { css } from "@emotion/css";

import Experience from "@comp/experience/Experience";

interface Props {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export const XmasCanvas = ({ setIsLoading }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audio = new Audio();
  audio.src = '/sounds/xmas.mp3';
  let musicPlay = false

  const playMusic = () => {
    if (!musicPlay) {
      audio.play()
      audio.volume = 0.5
      audio.loop = true
      musicPlay = true
    } else {
        audio.pause()
        musicPlay = false
    }
  }

  const stopMusic = () => {
    if (musicPlay) {
      musicPlay = false;
      audio.pause();
    }
  }

  useEffect(() => {
    let animationFrameId: number;
    let experience: Experience | undefined | null;
    if (canvasRef.current) {
      experience = new Experience(canvasRef.current, true)
      if (experience) {
        setTimeout(() => {
          playMusic();
          experience!.setRender(true)
          animationFrameId = experience!.time.animationFrameId!
          setIsLoading(false);
        }, 1000)
      }
    }

    return () => {
      stopMusic();
      experience?.removeEvents();
      experience?.setRender(false)
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <canvas
          ref={canvasRef}
          className={sCanvas}
        />  
      </Suspense>
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
  margin: 0;
  z-index: 99;
`