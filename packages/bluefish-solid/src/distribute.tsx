import _ from "lodash";
import Layout from "./layout";
import { BBox, ChildNode, Id, Transform, useScenegraph } from "./scenegraph";
import { JSX } from "solid-js/jsx-runtime";
import { ParentProps } from "solid-js";
import { maybeMax } from "./util/maybe";
import withBluefish from "./withBluefish";
import { useError } from "./errorContext";
import { dimUnownedError } from "./errors";

// export type DistributeProps = SpaceVerticalProps | SpaceHorizontalProps;
export type DistributeProps = ParentProps<{
  name: Id;
  direction: "vertical" | "horizontal";
  total?: number;
  spacing?: number;
}>;

export const Distribute = withBluefish(
  (props: DistributeProps) => {
    const error = useError();

    const layout = (childNodes: ChildNode[]) => {
      childNodes = Array.from(childNodes);

      if (props.name.endsWith("DEBUG")) {
        debugger;
      }

      if (props.direction === "vertical") {
        let height: number;
        let spacing: number;

        if (props.spacing !== undefined && props.total !== undefined) {
          spacing = props.spacing;
          height = props.total;
          // assign additional space to items that don't have an extent
          // filter to only items whose heights are owned by other
          let unassignedHeight = height;
          for (const childId of childNodes) {
            if (!childId.owned.height) {
              continue;
            }

            unassignedHeight -= childId.bbox.height!;
          }

          const unassignedChildren = childNodes.filter(
            (childId) => !childId.owned.height
          );

          const unassignedSpacing =
            unassignedHeight / unassignedChildren.length;

          for (const childId of unassignedChildren) {
            childId.bbox.height = unassignedSpacing;
          }
        } else if (props.spacing !== undefined) {
          spacing = props.spacing;
          // we expect all heights to be owned by other
          for (const childNode of childNodes) {
            if (!childNode.owned.height) {
              error(
                dimUnownedError({
                  source: props.name,
                  name: childNode.name,
                  dim: "height",
                })
              );
              return { bbox: {}, transform: { translate: {} } };
            }
          }

          height =
            _.sumBy(childNodes, (childId) => childId.bbox.height!) +
            spacing * (childNodes.length - 1);
        } else if (props.total !== undefined) {
          height = props.total;
          // we expect all heights to be owned by other
          for (const childNode of childNodes) {
            if (!childNode.owned.height) {
              error(
                dimUnownedError({
                  source: props.name,
                  name: childNode.name,
                  dim: "height",
                })
              );
              return { bbox: {}, transform: { translate: {} } };
            }
          }

          const occupiedHeight = _.sumBy(
            childNodes,
            (childId) => childId.bbox.height!
          );

          spacing = (props.total - occupiedHeight) / (childNodes.length - 1);
        } else {
          // TODO: make this error message better
          throw new Error("invalid options");
        }

        const fixedElement = childNodes.findIndex(
          (childId) => childId.owned.top
        );

        // use spacing and height to evenly distribute elements while ensuring that the fixed element
        // is fixed
        const startingY =
          fixedElement === -1
            ? 0
            : childNodes[fixedElement].bbox.top! -
              spacing * fixedElement -
              _.sumBy(
                childNodes.slice(0, fixedElement),
                (childId) => childId.bbox.height!
              );

        // subtract off spacing and the sizes of the first fixedElement elements
        let y = startingY;
        for (const childId of childNodes) {
          if (!childId.owned.top) {
            childId.bbox.top = y;
          }
          y += childId.bbox.height! + spacing;
        }

        return {
          bbox: {
            top: startingY,
            height,
          },
          transform: {
            translate: {},
          },
        };
      } else if (props.direction === "horizontal") {
        let width: number;
        let spacing: number;

        if (props.spacing !== undefined && props.total !== undefined) {
          spacing = props.spacing;
          width = props.total;
          // assign additional space to items that don't have an extent
          // filter to only items whose widths are owned by other
          let unassignedWidth = width;
          for (const childId of childNodes) {
            if (!childId.owned.width) {
              continue;
            }

            unassignedWidth -= childId.bbox.width!;
          }

          const unassignedChildren = childNodes.filter(
            (childId) => !childId.owned.width
          );

          const unassignedSpacing = unassignedWidth / unassignedChildren.length;

          for (const childId of unassignedChildren) {
            childId.bbox.width = unassignedSpacing;
          }
        } else if (props.spacing !== undefined) {
          spacing = props.spacing;
          // we expect all widths to be owned by other
          for (const childNode of childNodes) {
            if (!childNode.owned.width) {
              error(
                dimUnownedError({
                  source: props.name,
                  name: childNode.name,
                  dim: "width",
                })
              );
              return { bbox: {}, transform: { translate: {} } };
            }
          }

          width =
            _.sumBy(childNodes, (childId) => childId.bbox.width!) +
            spacing * (childNodes.length - 1);
        } else if (props.total !== undefined) {
          width = props.total;
          // we expect all widths to be owned by other
          for (const childNode of childNodes) {
            if (!childNode.owned.width) {
              error(
                dimUnownedError({
                  source: props.name,
                  name: childNode.name,
                  dim: "width",
                })
              );
              return { bbox: {}, transform: { translate: {} } };
            }
          }

          const occupiedWidth = _.sumBy(
            childNodes,
            (childId) => childId.bbox.width!
          );

          spacing = (props.total - occupiedWidth) / (childNodes.length - 1);
        } else {
          throw new Error("Invalid options for space");
        }

        const fixedElement = childNodes.findIndex(
          (childId) => childId.owned.left
        );

        // use spacing and width to evenly distribute elements while ensuring that the fixed element
        // is fixed
        const startingX =
          fixedElement === -1
            ? 0
            : childNodes[fixedElement].bbox.left! -
              spacing * fixedElement -
              _.sumBy(
                childNodes.slice(0, fixedElement),
                (childId) => childId.bbox.width!
              );

        // subtract off spacing and the sizes of the first fixedElement elements
        let x = startingX;
        for (const childId of childNodes) {
          if (!childId.owned.left) {
            childId.bbox.left = x;
          }
          x += childId.bbox.width! + spacing;
        }

        return {
          bbox: {
            left: startingX,
            width,
          },
          transform: {
            translate: {},
          },
        };
      } else {
        throw new Error("Invalid direction");
      }
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
        {props.children}
      </Layout>
    );
  },
  { displayName: "Distribute" }
);

export default Distribute;
