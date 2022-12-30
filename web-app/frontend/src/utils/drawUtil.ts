import { iDrawLine } from "@type/index";

export const drawLine = ( params: iDrawLine) => {
  const { c, from, to, color, size } = params
  c.beginPath();
  c.moveTo(from.x, from.y);
  c.lineTo(to.x, to.y);
  c.strokeStyle = color;
  c.lineWidth = size;
  c.lineCap = 'round';
  c.stroke();
  c.closePath();
}