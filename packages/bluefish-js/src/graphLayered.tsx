import { ParentProps, JSX, mergeProps, children, For } from "solid-js";
import withBluefish, { WithBluefishProps } from "./withBluefish";
import Layout from "./layout";
import { Transform, ChildNode, Id, BBox } from "./scenegraph";
import * as BBoxUtil from "./util/bbox";
import dagre from "dagre";
import { maybeSub } from "./util/maybe";

export type GraphLayeredProps = ParentProps<{
  name: Id;
  direction?: "left-right" | "right-left" | "top-bottom" | "bottom-top";
  x?: number;
  y?: number;
}>;

export const convertDirection = {
  "left-right": "LR",
  "right-left": "RL",
  "top-bottom": "TB",
  "bottom-top": "BT",
};

/* 
TODO: might be nice to have a modifier on components like Jetpack Compose instead of having to add a
new Node component.
*/

export type NodeProps = WithBluefishProps<
  ParentProps<{ id: string; type?: "node" }>
>;

export const Node = (props: NodeProps) => {
  props = mergeProps(
    {
      type: "node" as const,
    },
    props
  );

  return props as unknown as JSX.Element;
};

export type EdgeProps = WithBluefishProps<{
  source: string;
  target: string;
  type?: "edge";
}>;

export const Edge = (props: EdgeProps) => {
  props = mergeProps(
    {
      type: "edge" as const,
    },
    props
  );

  return props as unknown as JSX.Element;
};

export const GraphLayered = withBluefish(
  (props: GraphLayeredProps) => {
    props = mergeProps(
      {
        direction: "top-bottom" as const,
      },
      props
    );

    const nodesAndEdges = children(() => props.children) as unknown as () => (
      | NodeProps
      | EdgeProps
    )[];

    const nodes = () =>
      nodesAndEdges().filter((node) => node.type === "node") as NodeProps[];
    const edges = () =>
      nodesAndEdges().filter((node) => node.type === "edge") as EdgeProps[];

    const layout = (childNodes: ChildNode[]) => {
      // Create a new directed graph
      const g = new dagre.graphlib.Graph();

      // Set an object for the graph label
      g.setGraph({
        rankdir: convertDirection[props.direction!],
      });

      // Default to assigning a new object as a label for each new edge.
      g.setDefaultEdgeLabel(function () {
        return {};
      });

      const nodesSnapshot = nodes();

      for (const nodeIdx in childNodes) {
        g.setNode(nodesSnapshot[nodeIdx].id, {
          width: childNodes[nodeIdx].bbox.width,
          height: childNodes[nodeIdx].bbox.height,
        });
      }

      // TODO: add code that asserts that the positions aren't fixed and the widths and heights are known

      const edgesSnapshot = edges();

      // Add edges to the graph.
      for (const edge of edgesSnapshot) {
        g.setEdge(edge.source, edge.target);
      }

      dagre.layout(g);

      for (const node of g.nodes()) {
        // to find the childNode, we have to find the index of the id in the nodesSnapshot, then use
        // that in the childNodes array
        const childNode =
          childNodes[
            nodesSnapshot.findIndex((childNode) => childNode.id === node)
          ];
        if (!childNode) {
          throw new Error(`Couldn't find node ${node}`);
        }

        childNode.bbox.left = g.node(node).x;
        childNode.bbox.top = g.node(node).y;
      }

      /* 
    TODO: draw arrows???
     */

      const bbox = BBoxUtil.from(childNodes.map((childId) => childId.bbox));

      return {
        bbox,
        transform: {
          translate: {
            x: maybeSub(props.x, bbox.left),
            y: maybeSub(props.y, bbox.top),
          },
        },
      };
    };

    const paint = (paintProps: {
      bbox: BBox;
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
        <For each={nodes()}>{(node) => node.children}</For>
      </Layout>
    );
  },
  { displayName: "GraphLayered" }
);
