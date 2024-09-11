import reduceCSSCalc from "reduce-css-calc";
import { TextProps, WordsWithDims } from "./types";
import getStringDims from "./getStringDims";
import { Accessor, createMemo, mergeProps } from "solid-js";

function isNumber(val: unknown): val is number {
  return typeof val === "number";
}

function isXOrYInValid(xOrY: string | number | undefined) {
  return (
    // number that is not NaN or Infinity
    (typeof xOrY === "number" && Number.isFinite(xOrY)) ||
    // for percentage
    typeof xOrY === "string"
  );
}

export default function useText(props: TextProps): {
  wordsByLines: Accessor<WordsWithDims[]>;
  startDy: Accessor<string>;
  transform: Accessor<string>;
} {
  props = mergeProps(
    {
      "vertical-anchor": "end",
      scaleToFit: false,
      "line-height": "1em",
      "cap-height": "0.71em", // Magic number from d3
      x: 0,
      y: 0,
    } as const,
    props
  );

  const isXOrYNotValid = () =>
    !isXOrYInValid(props.x) || !isXOrYInValid(props.y);

  const words = createMemo(() =>
    props.children == null
      ? []
      : props.children.toString().split(/(?:(?!\u00A0+)\s+)/)
  );

  const wordsWithDims = createMemo(() =>
    words().map((word) => ({
      word,
      wordWidth: getStringDims(word, props)?.width ?? 0,
      wordHeight: getStringDims(word, props)?.height ?? 0,
    }))
  );

  const spaceDims = createMemo(() => ({
    width: getStringDims("\u00A0", props)?.width ?? 0,
    height: getStringDims("\u00A0", props)?.height ?? 0,
  }));

  const wordsByLines = createMemo(() => {
    if (isXOrYNotValid()) {
      return [];
    }

    const ret = wordsWithDims().reduce(
      (result: WordsWithDims[], { word, wordWidth, wordHeight }) => {
        const currentLine = result[result.length - 1];

        if (
          currentLine &&
          (props.width === undefined ||
            props.scaleToFit ||
            (currentLine.width ?? 0) + wordWidth + spaceDims().width <
              props.width)
        ) {
          // Word can be added to an existing line
          currentLine.words.push(word);
          currentLine.width = currentLine.width ?? 0;
          currentLine.width += wordWidth + spaceDims().width;
          currentLine.height = Math.max(currentLine.height ?? 0, wordHeight);
        } else {
          // Add first word to line or word is too long to scaleToFit on existing line
          const newLine = {
            words: [word],
            width: wordWidth,
            height: wordHeight,
          };
          result.push(newLine);
        }

        return result;
      },
      []
    );

    return ret;
  });

  const startDy = () => {
    const startDyStr = isXOrYNotValid()
      ? ""
      : props["vertical-anchor"] === "start"
      ? reduceCSSCalc(`calc(${props["cap-height"]})`)
      : props["vertical-anchor"] === "middle"
      ? reduceCSSCalc(
          `calc(${(wordsByLines().length - 1) / 2} * -${
            props["line-height"]
          } + (${props["cap-height"]} / 2))`
        )
      : reduceCSSCalc(
          `calc(${wordsByLines().length - 1} * -${props["line-height"]})`
        );

    return startDyStr;
  };

  const transform = () => {
    const transforms: string[] = [];
    if (isXOrYNotValid()) {
      return "";
    }

    if (
      isNumber(props.x) &&
      isNumber(props.y) &&
      isNumber(props.width) &&
      props.scaleToFit &&
      wordsByLines().length > 0
    ) {
      const lineWidth = wordsByLines()[0].width || 1;
      const sx =
        props.scaleToFit === "shrink-only"
          ? Math.min(props.width / lineWidth, 1)
          : props.width / lineWidth;
      const sy = sx;
      const originX = props.x - sx * props.x;
      const originY = props.y - sy * props.y;
      transforms.push(`matrix(${sx}, 0, 0, ${sy}, ${originX}, ${originY})`);
    }
    if (props.angle) {
      transforms.push(`rotate(${props.angle}, ${props.x}, ${props.y})`);
    }

    return transforms.length > 0 ? transforms.join(" ") : "";
  };

  return { wordsByLines, startDy, transform };
}
