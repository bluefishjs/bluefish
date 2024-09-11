import { JSX, ParentProps } from "solid-js";
import { Layout } from "./layout";
import _, { get, startsWith } from "lodash";
import { maybe, maybeAdd, maybeMax, maybeMin, maybeSub } from "./util/maybe";
import { ChildNode, Id, Transform } from "./scenegraph";
import withBluefish from "./withBluefish";
import * as BBox from "./util/bbox";

export type Alignment2D =
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "centerLeft"
  | "center"
  | "centerRight"
  | "bottomLeft"
  | "bottomCenter"
  | "bottomRight";

// generate a union of single-key objects using Alignment2D as the keys
export type Alignment2DObjs = {
  [K in Alignment2D]: { [k in K]: boolean };
}[Alignment2D];

export type AlignmentVertical = "top" | "centerY" | "bottom";
export type AlignmentHorizontal = "left" | "centerX" | "right";

// export type Alignment1DHorizontal = "left" | "centerHorizontally" | "right";
// export type Alignment1DVertical = "top" | "centerVertically" | "bottom";

export type Alignment1D = AlignmentVertical | AlignmentHorizontal;

export type Alignment1DObjs = {
  [K in Alignment1D]: { [k in K]: boolean };
}[Alignment1D];

const verticalAlignmentMap: {
  [K in Alignment2D | Alignment1D]: AlignmentVertical | undefined;
} = {
  topLeft: "top",
  topCenter: "top",
  topRight: "top",
  centerLeft: "centerY",
  center: "centerY",
  centerRight: "centerY",
  bottomLeft: "bottom",
  bottomCenter: "bottom",
  bottomRight: "bottom",
  top: "top",
  centerY: "centerY",
  bottom: "bottom",
  left: undefined,
  centerX: undefined,
  right: undefined,
};

export const verticalAlignment = (
  alignment: Alignment2D | Alignment1D
): AlignmentVertical | undefined => {
  return verticalAlignmentMap[alignment];
};

const horizontalAlignmentMap: {
  [K in Alignment2D | Alignment1D]: AlignmentHorizontal | undefined;
} = {
  topLeft: "left",
  topCenter: "centerX",
  topRight: "right",
  centerLeft: "left",
  center: "centerX",
  centerRight: "right",
  bottomLeft: "left",
  bottomCenter: "centerX",
  bottomRight: "right",
  top: undefined,
  centerY: undefined,
  bottom: undefined,
  left: "left",
  centerX: "centerX",
  right: "right",
};

export const horizontalAlignment = (
  alignment: Alignment2D | Alignment1D
): AlignmentHorizontal | undefined => {
  return horizontalAlignmentMap[alignment];
};

export const splitAlignment = (
  alignment: Alignment2D | Alignment1D
): [AlignmentVertical | undefined, AlignmentHorizontal | undefined] => {
  return [verticalAlignment(alignment), horizontalAlignment(alignment)];
};

export type AlignProps = ParentProps<{
  name: Id;
  x?: number;
  y?: number;
  alignment: Alignment2D | Alignment1D;
}>;

export const Align = withBluefish(
  (props: AlignProps) => {
    // const { children, id } = props;
    const layout = (childNodes: ChildNode[]) => {
      childNodes = Array.from(childNodes);

      if (props.name.endsWith("DEBUG")) {
        debugger;
      }

      const alignments = childNodes
        .map((m) => /* m.guidePrimary ?? */ props.alignment)
        .map((alignment) => splitAlignment(alignment));

      // horizontal
      const horizontalPlaceables = _.zip(childNodes, alignments)
        .filter(([placeable, alignment]) => alignment![0] !== undefined)
        .map(([placeable, alignment]) => [placeable, alignment![0]]) as [
        ChildNode,
        AlignmentVertical
      ][];

      const existingHorizontalPositions = horizontalPlaceables
        .filter(
          ([placeable, alignment]) => placeable!.owned[alignment as BBox.Dim]
        )
        .map(([placeable, alignment]) => {
          return [placeable!, placeable!.bbox[alignment as BBox.Dim]!];
        }) satisfies [ChildNode, number][];

      const defaultHorizontalValue = existingHorizontalPositions[0]?.[1] ?? 0;

      for (const [placeable, alignment] of horizontalPlaceables) {
        if (placeable!.owned[alignment as BBox.Dim]) continue;
        placeable!.bbox[alignment as BBox.Dim] = defaultHorizontalValue;
      }

      // vertical
      const verticalPlaceables = _.zip(childNodes, alignments)
        .filter(([placeable, alignment]) => alignment![1] !== undefined)
        .map(([placeable, alignment]) => [placeable, alignment![1]]) as [
        ChildNode,
        AlignmentHorizontal
      ][];

      const existingVerticalPositions = verticalPlaceables
        .filter(
          ([placeable, alignment]) => placeable!.owned[alignment as BBox.Dim]
        )
        .map(([placeable, alignment]) => {
          return [placeable!, placeable!.bbox[alignment as BBox.Dim]!];
        }) satisfies [ChildNode, number][];

      const defaultVerticalValue = existingVerticalPositions[0]?.[1] ?? 0;

      for (const [placeable, alignment] of verticalPlaceables) {
        if (placeable!.owned[alignment as BBox.Dim]) continue;
        placeable!.bbox[alignment as BBox.Dim] = defaultVerticalValue;
      }

      const bbox = BBox.from(childNodes.map((childNode) => childNode.bbox));

      return {
        transform: {
          translate: {
            x: maybeSub(props.x, bbox.left),
            y: maybeSub(props.y, bbox.top),
          },
        },
        bbox: {
          centerX:
            horizontalAlignment(props.alignment) !== undefined
              ? bbox.centerX
              : undefined,
          width:
            horizontalAlignment(props.alignment) !== undefined
              ? bbox.width
              : undefined,
          centerY:
            verticalAlignment(props.alignment) !== undefined
              ? bbox.centerY
              : undefined,
          height:
            verticalAlignment(props.alignment) !== undefined
              ? bbox.height
              : undefined,
        },
      };
    };

    const paint = (paintProps: {
      bbox: BBox.BBox;
      transform: Transform;
      children: JSX.Element;
    }) => {
      return (
        <g
          transform={`translate(${paintProps.transform.translate.x ?? 0}, ${
            paintProps.transform.translate.y ?? 0
          })`}
        >
          {paintProps.children}
        </g>
      );
    };

    return (
      <Layout name={props.name} layout={layout} paint={paint}>
        {props.children}
      </Layout>
    );
  },
  { displayName: "Align" }
);

export default Align;
