import {
  JSX,
  ParentProps,
  Show,
  createEffect,
  mergeProps,
  untrack,
} from "solid-js";

import _, { get, startsWith } from "lodash";
import Layout from "../layout";
import withBluefish from "../withBluefish";
import { Id } from "../scenegraph";

export const maybeSub = (a, b) =>
  a !== undefined && b !== undefined ? a - b : undefined;
const maybeMin = (a, b) =>
  a !== undefined && b !== undefined ? Math.min(a, b) : undefined;
const maybeMax = (a, b) =>
  a !== undefined && b !== undefined ? Math.max(a, b) : undefined;

export const LayoutFunction = withBluefish(
  (props) => {
    props = mergeProps({}, props);

    const layout = (childNodes) => {
      const fromBBox = childNodes[0].bbox;
      const toBBox = childNodes[1].bbox;

      for (const [key, value] of Object.entries(props.f(fromBBox, toBBox))) {
        toBBox[key] = value;
      }

      return {
        transform: {
          translate: {
            x: props.x,
            y: props.y,
          },
        },
        bbox: toBBox,
      };
    };

    const paint = (paintProps) => {
      return <g>{paintProps.children}</g>;
    };

    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        {props.children}
      </Layout>
    );
  },
  { displayName: "LayoutFunction" }
);

export default LayoutFunction;
