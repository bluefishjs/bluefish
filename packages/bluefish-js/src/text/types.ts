import { Ref } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import { Id } from "../scenegraph";
import { Delimiter } from "./splitAtDelimiters";

type SVGTSpanProps = JSX.TSpanSVGAttributes<SVGTSpanElement>;
type SVGTextProps = JSX.TextSVGAttributes<SVGTextElement>;

type OwnProps = {
  /** className to apply to the SVGText element. */
  className?: string;
  /** Whether to scale the fontSize to accommodate the specified width.  */
  scaleToFit?: boolean | "shrink-only";
  /** Rotational angle of the text. */
  angle?: number;
  /** Horizontal text anchor. */
  // "text-anchor"?: "start" | "middle" | "end" | "inherit";
  /** Vertical text anchor. */
  "vertical-anchor"?: "start" | "middle" | "end";
  /** Styles to be applied to the text (and used in computation of its size). */
  // style?: JSX.CSSProperties;
  /** Ref passed to the Text SVG element. */
  innerRef?: Ref<SVGGElement>;
  /** Ref passed to the Text text element */
  innerTextRef?: Ref<SVGTextElement>;
  /** x position of the text. */
  x?: string | number;
  /** y position of the text. */
  y?: string | number;
  /** dx offset of the text. */
  dx?: string | number;
  /** dy offset of the text. */
  dy?: string | number;
  /** Desired "line height" of the text, implemented as y offsets. */
  "line-height"?: SVGTSpanProps["dy"];
  /** Cap height of the text. */
  "cap-height"?: string | number | undefined;
  /** Font size of text. */
  // "font-size"?: string;
  /** Font family of text. */
  // "font-family"?: string;
  /** Fill color of text. */
  // fill?: string;
  /** Maximum width to occupy (approximate as words are not split). */
  width?: number;
  /** String (or number coercible to one) to be styled and positioned. */
  children?: string | number;

  delimiters?: Delimiter[];
};

export type TextProps = OwnProps &
  Omit<SVGTextProps, keyof OwnProps> & { name: Id };

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

export interface WordsWithDims {
  words: string[];
  width?: number;
  height?: number;
}
