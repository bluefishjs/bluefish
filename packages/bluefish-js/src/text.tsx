import { For, Ref, mergeProps, splitProps } from "solid-js";
import { TextProps } from "./text/types";
import useText from "./text/useText";
import { BBox, Transform } from "./scenegraph";
import Layout from "./layout";
import computeBoundingBox from "./text/textBBox";
import withBluefish from "./withBluefish";
import splitAtDelimiters from "./text/splitAtDelimiters";

const SVG_STYLE = { overflow: "visible" };

export const Text = withBluefish(
  (props: TextProps) => {
    props = mergeProps(
      {
        // dx: 0,
        // dy: 0,
        "text-anchor": "start" as const,
        "vertical-anchor": "end" as const,
        "line-height": "1em",
        "cap-height": "0.71em", // Magic number from d3
        "font-family": "Alegreya Sans, sans-serif",
        "font-weight": 700,
        "font-size": "14",
        x: 0,
        y: 0,
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
        ],
      },
      props
    );

    const [_, textProps] = splitProps(props, [
      "name",
      "dx",
      "dy",
      "innerRef",
      "innerTextRef",
      "vertical-anchor",
      "angle",
      "line-height",
      "scaleToFit",
      "cap-height",
      "width",
      "delimiters",
    ]);

    // const textAndMathRegions = () =>
    //   splitAtDelimiters(
    //     props.children !== undefined ? `${props.children}` : "",
    //     props.delimiters!
    //   );

    const { wordsByLines, startDy, transform } = useText(props);

    const mergedProps = mergeProps(props, {
      get wordsByLines() {
        return wordsByLines();
      },
      get startDy() {
        return startDy();
      },
      get transform() {
        return transform();
      },
    });

    const layout = () => {
      const bbox = computeBoundingBox(mergedProps);

      return {
        bbox: {
          left: bbox.x,
          top: bbox.y,
          width: bbox.width,
          height: bbox.height,
        },
        transform: {
          translate: {
            x: props.dx !== undefined ? parseFloat(`${props.dx}`) : undefined,
            y: props.dy !== undefined ? parseFloat(`${props.dy}`) : undefined,
          },
        },
      };
    };

    const paint = (paintProps: { bbox: BBox; transform: Transform }) => {
      return (
        <g
          ref={props.innerRef}
          transform={`translate(${paintProps.transform.translate.x}, ${paintProps.transform.translate.y})`}
          style={SVG_STYLE}
        >
          {wordsByLines().length > 0 ? (
            <text
              ref={props.innerTextRef}
              transform={transform()}
              {...textProps}
            >
              <For each={wordsByLines()}>
                {(line, index) => (
                  <tspan
                    x={props.x}
                    dy={index() === 0 ? startDy() : props["line-height"]}
                    cap-height={props["cap-height"]}
                  >
                    {line.words.join(" ")}
                  </tspan>
                )}
              </For>
            </text>
          ) : null}
        </g>
      );
    };

    return <Layout name={props.name} layout={layout} paint={paint} />;
  },
  { displayName: "Text" }
);

export default Text;
