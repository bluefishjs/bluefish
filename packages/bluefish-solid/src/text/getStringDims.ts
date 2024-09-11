import memoize from "lodash/memoize";
import { TextProps } from "./types";

const MEASUREMENT_ELEMENT_ID = "__react_svg_text_measurement_id";

function getStringDims(str: string, style?: TextProps) {
  try {
    // Calculate length of each word to be used to determine number of words per line
    let textEl = document.getElementById(
      MEASUREMENT_ELEMENT_ID
    ) as SVGTextElement | null;
    if (!textEl) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("aria-hidden", "true");
      svg.style.width = "0";
      svg.style.height = "0";
      svg.style.position = "absolute";
      svg.style.top = "-100%";
      svg.style.left = "-100%";
      svg.style.padding = "0";
      svg.style.margin = "0";
      textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
      textEl.setAttribute("id", MEASUREMENT_ELEMENT_ID);
      svg.appendChild(textEl);
      document.body.appendChild(svg);
    }

    Object.assign(textEl.style, style);
    textEl.textContent = str;
    const width = textEl.getComputedTextLength();

    return {
      width,
      height: style !== undefined ? parseFloat(`${style["font-size"]}`) : 0,
    };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default memoize(getStringDims, (str, style) => {
  if (!style) return `${str}_`;
  const { children, name, ...rest } = style;
  return `${str}_${JSON.stringify(rest)}`;
});
