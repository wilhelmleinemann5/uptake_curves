import { svg, TemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
export const renderSvg = (
  content: string,
  width: number,
  height: number,
  viewboxWidth: number = width,
  viewboxHeight: number = height
): TemplateResult => svg`
  <svg
    width="${width}"
    height="${height}"
    viewBox="0 0 ${viewboxWidth} ${viewboxHeight}"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  ${unsafeSVG(content)}
  </svg>
`;
