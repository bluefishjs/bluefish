/* Adapted from https://github.com/harunurhan/react-latex-next/blob/master/src/splitAtDelimiters.ts,
which was in turn adapted from /contrib/auto-render/splitAtDelimiters.js at github.com/Khan/KaTeX */

export type MathJaxData = {
  data: string;
  type: string;
  rawData?: string;
  display?: boolean;
};

export type Delimiter = {
  right: string;
  left: string;
  display: boolean;
};

function findEndOfMath(
  delimiterValue: string,
  text: string,
  startIndex: number
): number {
  let index = startIndex;
  let braceLevel = 0;

  const delimLength = delimiterValue.length;

  while (index < text.length) {
    const character = text[index];

    if (
      braceLevel <= 0 &&
      text.slice(index, index + delimLength) === delimiterValue
    ) {
      return index;
    } else if (character === "\\") {
      index++;
    } else if (character === "{") {
      braceLevel++;
    } else if (character === "}") {
      braceLevel--;
    }

    index++;
  }

  return -1;
}

function escapeRegex(text: string): string {
  return text.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
}

const amsRegex = /^\\begin{/;

export default function splitAtDelimiters(
  text: string,
  delimiters: Delimiter[]
): MathJaxData[] {
  let index;
  const data = [];

  const regexLeft = new RegExp(
    "(" + delimiters.map((x) => escapeRegex(x.left)).join("|") + ")"
  );

  while (true) {
    index = text.search(regexLeft);
    if (index === -1) {
      break;
    }
    if (index > 0) {
      data.push({
        type: "text",
        data: text.slice(0, index),
      });
      text = text.slice(index); // now text starts with delimiter
    }
    // ... so this always succeeds:
    const i = delimiters.findIndex((delim) => text.startsWith(delim.left));
    index = findEndOfMath(delimiters[i].right, text, delimiters[i].left.length);
    if (index === -1) {
      break;
    }
    const rawData = text.slice(0, index + delimiters[i].right.length);
    const math = amsRegex.test(rawData)
      ? rawData
      : text.slice(delimiters[i].left.length, index);
    data.push({
      type: "math",
      data: math,
      rawData,
      display: delimiters[i].display,
    });
    text = text.slice(index + delimiters[i].right.length);
  }

  if (text !== "") {
    data.push({
      type: "text",
      data: text,
    });
  }

  return data;
}
