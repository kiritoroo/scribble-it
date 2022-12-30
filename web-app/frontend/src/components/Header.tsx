import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { css } from "@emotion/css";
import Marquee from "react-fast-marquee";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ zIndex: 999 }}>
        <div className={sHeader}>
          <div className={sMarqueeWrapper}>
            <Marquee speed={80} gradient={false}>
              <span style={{ marginLeft: '50px', marginRight: '50px', padding: '5px' }}>
                <span style={{ marginLeft: '10px', marginRight: '50px' }}>
                  20110580 - Nguyễn Thị Thùy Trang
                </span>
                <span style={{ marginLeft: '10px', marginRight: '50px' }}>
                  20110135 - Lê Thị Thanh Tuyết
                </span>
              </span>
            </Marquee>
          </div>
          <div className={sTittle}>
            <a onClick={() => navigate("/")}>AI Final Project</a>
          </div>
          <div className={sGrid}>
            <div>
              <Link to={"/about"}>Giới thiệu</Link>
            </div>
            <div>
              <a href={"https://github.com/kiritoroo/scribble-it"}>Github</a>
            </div>
            <div>
              <Link to='/digits'>Digits Handwriting</Link>
            </div>
            <div>
              <Link to={"/characters"}>Characters Handwriting</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const sHeader = css`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  border-bottom: var(--b-md) solid black;
  background-color: var(--c-white);
  &::after {
		content: "";
		display: block;
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		bottom:  -15px;
		left: calc(50% - 49.5%);
    border-radius: 50px;
		border: 2px solid black;
		background-color: var(--c-pink-200);
	}
`;

const sMarqueeWrapper = css`
  user-select: none;
  padding: 0.5em 1.875em;
  display: flex;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background: white;
  &:hover {
    cursor: cell;
  }
  div {
    font-size: 1.2em;
    overflow-x: hidden;
    overflow-y: hidden;
  }
`;

const sTittle = css`
  font-size: 1.5em;
  font-weight: 500;
  user-select: none;
  padding: 0.5em 1em;
  display: flex;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  border-left: 2px solid;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    var(--c-pink-100) 6px,
    var(--c-pink-100) 12px
  );
  &:hover {
    cursor: crosshair;
  }
`;

const sGrid = css`
  display: grid;
  width: 80%;
  margin: 0;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0.5em;
    background: linear-gradient(to left, white 50%, var(--c-pink-200) 50%) right;
    background-size: 200%;
    transition: .3s ease-out;
    &:active {
      transition: .1s ease;
      background: var(--c-pink-300);
    }
    &:hover {
      background-position: left;
      cursor: crosshair;    
    }
    a {
      user-select: none;
      padding: 5px 10px;
      margin: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      color: #000;
      text-decoration: none;
      font-size: 1.2em;
      font-weight: 400;
      transition: .3s ease-out;
      &:hover {
        cursor: crosshair;    
      }
    }
  }
  
  & > :nth-child(1), & :nth-child(2) {
    border-bottom: var(--b-sm) solid;
    border-left: var(--b-sm) solid;
  }
  & :nth-child(3), & :nth-child(4) {
    border-left: var(--b-sm) solid;
  }
`


