export type TextMeasurement = {
  left: number;
  right: number;
  width: number;
  fontTop: number;
  fontBottom: number;
  fontHeight: number;
  // position of text's alphabetic baseline assuming top is the origin
  baseline: number;
  fontDescent: number;
  actualDescent: number;
};

export function measureText(text: string, font: string): TextMeasurement {
  measureText.context.textBaseline = "alphabetic";
  measureText.context.font = font;
  const measurements = measureText.context.measureText(text);
  return {
    left: measurements.actualBoundingBoxLeft,
    right: measurements.actualBoundingBoxRight,
    fontTop: measurements.fontBoundingBoxAscent,
    fontBottom: measurements.fontBoundingBoxDescent,
    width:
      Math.abs(measurements.actualBoundingBoxLeft) +
      Math.abs(measurements.actualBoundingBoxRight),
    fontHeight:
      Math.abs(measurements.fontBoundingBoxAscent) +
      Math.abs(measurements.fontBoundingBoxDescent),
    baseline: Math.abs(measurements.fontBoundingBoxAscent),
    fontDescent: Math.abs(measurements.fontBoundingBoxDescent),
    actualDescent: Math.abs(measurements.actualBoundingBoxDescent),
  };
}
// static variable
export namespace measureText {
  export const element = document.createElement("canvas");
  // puts canvas on screen. useful for debugging measurements
  /* element.width = 1000;
  element.height = 1000;
  document.body.appendChild(element); */
  export const context = element.getContext("2d")!;
}
