import React, { useState,useEffect } from "react";
import { css } from "@emotion/css";

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  
  const onMouseLeave = () => {
    setHidden(true);
  };

  const onMouseEnter = () => {
    setHidden(false);
  };

  const onMouseMove = (e: MouseEvent) => {
    setHidden(false);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const onMouseDown = () => {
    setClicked(true);
  };

  const onMouseUp = () => {
    setClicked(false);
  };

  const addEventListeners = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  };

  const removeEventListeners = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseenter", onMouseEnter);
    document.removeEventListener("mouseleave", onMouseLeave);
    document.removeEventListener("mousedown", onMouseDown);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const handleLinkHoverEvents = () => {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("mouseover", () => setLinkHovered(true));
      el.addEventListener("mouseout", () => setLinkHovered(false));
    });
  };

  useEffect(() => {
    addEventListeners();
    handleLinkHoverEvents();
    return () => removeEventListeners();
  }, []);

  return (
    <div
      className={sCursor(clicked, hidden, linkHovered)}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
    </div>
  );
}

const sCursor = (clicked: boolean, hidden: boolean, linkHovered: boolean) => css`
  position: fixed;
  width: 30px;
  height: 30px;
  background: var(--c-pink-200);
  border-radius: 100%;
  transform: translate(-50%, -50%);
  user-select: none;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: normal;
  transition: 150ms ease;
  transition-property: border, opacity, background-color, transform, mix-blend-mode;
  ${clicked === true &&
  `
    transform: translate(-50%, -50%) scale(0.8);
    background-color: var(--c-pink-300);
  `}
  ${linkHovered === true &&
  `
    transform: translate(-50%, -50%) scale(3);
    background-color: transparent;
    border: 1px solid var(--c-pink-300);
  `}
  ${hidden === true &&
  `
    opacity: 0;
  `}
`