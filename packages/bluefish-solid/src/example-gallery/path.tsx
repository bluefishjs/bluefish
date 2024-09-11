// Path Component extending base Bluefish. Should eventually be merged into Bluefish
import {
    JSX,
    ParentProps,
    Show,
    createEffect,
    mergeProps,
    splitProps,
    untrack,
  } from "solid-js";
  import withBluefish from "../withBluefish";
  import { PaperScope } from "paper";
  import Layout from "../layout";
  // TODO: should be exported by Bluefish
  export const maybeSub = (a, b) =>
    a !== undefined && b !== undefined ? a - b : undefined;
  
  // TODO: add support for points as well as d?
  // export type PathProps = JSX.PathSVGAttributes<SVGPathElement> & {
  //   name: Id;
  //   d: string;
  //   x?: number;
  //   y?: number;
  //   position?: "absolute" | "relative";
  // };
  
  export const Path = withBluefish((props) => {
    props = mergeProps(
      {
        "stroke-width": 3,
        stroke: "black",
        position: "relative",
        fill: "none",
      },
      props
    );
  
    const canvas = document.createElement("canvas");
    const paperScope = new PaperScope();
    paperScope.setup(canvas);
  
    const layout = (childIds) => {
      childIds = Array.from(childIds);
  
      if (props.name.endsWith("DEBUG")) {
        debugger;
      }
  
      const path = new paperScope.Path(props.d);
      const bounds = path.bounds;
  
      return {
        transform: {
          translate: {
            x: props.position === "absolute" ? 0 : maybeSub(props.x, bounds.left),
            y: props.position === "absolute" ? 0 : maybeSub(props.y, bounds.top),
          },
        },
        bbox: {
          left: bounds.left,
          top: bounds.top,
          width: bounds.width,
          height: bounds.height,
        },
        customData: {
          path: path,
        },
      };
    };
  
    const paint = (paintProps) => {
      const [_, rest] = splitProps(props, ["name", "x", "y", "d", "position"]);
  
      return (
        <Show
          when={paintProps.customData}
          fallback={<g>{paintProps.children}</g>}
        >
          <g
            transform={`translate(${paintProps.transform.translate.x ?? 0}, ${
              paintProps.transform.translate.y ?? 0
            })`}
          >
            <path {...rest} d={paintProps.customData.path?.pathData ?? ""} />
            {paintProps.children}
          </g>
        </Show>
      );
    };
  
    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        {props.children}
      </Layout>
    );
  });
  
  export default Path;
  