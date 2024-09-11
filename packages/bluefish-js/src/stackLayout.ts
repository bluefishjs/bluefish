import _ from "lodash";
import {
  Alignment1D,
  Alignment2D,
  horizontalAlignment,
  verticalAlignment,
} from "./align";
import { ChildNode, Id, LayoutFn } from "./scenegraph";
import { maybe, maybeMax, maybeSub } from "./util/maybe";
import * as BBox from "./util/bbox";
import { useError } from "./errorContext";
import { dimUnownedError } from "./errors";

export type StackArgs = {
  name: Id;
  x?: number;
  y?: number;
  alignment?: Alignment1D;
  direction: "vertical" | "horizontal";
  total?: number;
  spacing?: number;
};

export const stackLayout =
  (args: StackArgs): LayoutFn =>
  (childNodes: ChildNode[]) => {
    const error = useError();

    if (args.name.endsWith("DEBUG")) {
      debugger;
    }

    /* ALIGNMENT */
    const alignments = childNodes.map(
      (m) => /* m.guidePrimary ?? */ args.alignment
    );

    const placeables = _.zip(childNodes, alignments).filter(
      ([placeable, alignment]) => alignment !== undefined
    ) as [ChildNode, Alignment1D][];

    const existingPositions = placeables
      .filter(
        ([placeable, alignment]) => placeable!.owned[alignment as BBox.Dim]
      )
      .map(([placeable, alignment]) => {
        return [placeable!, placeable!.bbox[alignment as BBox.Dim]!];
      }) satisfies [ChildNode, number][];

    const defaultValue = existingPositions[0]?.[1] ?? 0;

    for (const [placeable, alignment] of placeables) {
      if (placeable!.owned[alignment as BBox.Dim]) continue;
      placeable!.bbox[alignment as BBox.Dim] = defaultValue;
    }

    /* DISTRIBUTE */
    if (args.direction === "vertical") {
      let height: number;
      let spacing: number;

      if (args.spacing !== undefined && args.total !== undefined) {
        spacing = args.spacing;
        height = args.total;
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

        const unassignedSpacing = unassignedHeight / unassignedChildren.length;

        for (const childId of unassignedChildren) {
          childId.bbox.height = unassignedSpacing;
        }
      } else if (args.spacing !== undefined) {
        spacing = args.spacing;
        // we expect all heights to be owned by other
        for (const childId of childNodes) {
          if (!childId.owned.height) {
            error(
              dimUnownedError({
                source: args.name,
                name: childId.name,
                dim: "height",
              })
            );
            return { bbox: {}, transform: { translate: {} } };
          }
        }

        height =
          _.sumBy(childNodes, (childId) => childId.bbox.height!) +
          spacing * (childNodes.length - 1);
      } else if (args.total !== undefined) {
        height = args.total;
        // we expect all heights to be owned by other
        for (const childId of childNodes) {
          if (!childId.owned.height) {
            error(
              dimUnownedError({
                source: args.name,
                name: childId.name,
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

        spacing = (args.total - occupiedHeight) / (childNodes.length - 1);
      } else {
        // TODO: make this error message better
        throw new Error("invalid options");
      }

      const fixedElement = childNodes.findIndex((childId) => childId.owned.top);

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

      const bbox = BBox.from(childNodes.map((childId) => childId.bbox));

      // TODO: is the width computation correct? should it take position into account?
      return {
        // bbox: {
        //   top: startingY,
        //   width: maybeMax(childNodes.map((childId) => childId.bbox.width)),
        //   height,
        // },
        bbox,
        transform: {
          translate: {
            x: maybeSub(args.x, bbox.left),
            y: maybeSub(args.y, bbox.top),
          },
        },
      };
    } else if (args.direction === "horizontal") {
      let width: number;
      let spacing: number;

      if (args.spacing !== undefined && args.total !== undefined) {
        spacing = args.spacing;
        width = args.total;
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
      } else if (args.spacing !== undefined) {
        spacing = args.spacing;
        // we expect all widths to be owned by other
        for (const childId of childNodes) {
          if (!childId.owned.width) {
            error(
              dimUnownedError({
                source: args.name,
                name: childId.name,
                dim: "width",
              })
            );
            return { bbox: {}, transform: { translate: {} } };
          }
        }

        width =
          _.sumBy(childNodes, (childId) => childId.bbox.width!) +
          spacing * (childNodes.length - 1);
      } else if (args.total !== undefined) {
        width = args.total;
        // we expect all widths to be owned by other
        for (const childId of childNodes) {
          if (!childId.owned.width) {
            error(
              dimUnownedError({
                source: args.name,
                name: childId.name,
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

        spacing = (args.total - occupiedWidth) / (childNodes.length - 1);
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

      const bbox = BBox.from(childNodes.map((childId) => childId.bbox));

      // TODO: is the height computation correct? should it take position into account?
      return {
        // bbox: {
        //   left: startingX,
        //   height: maybeMax(childNodes.map((childId) => childId.bbox.height)),
        //   width,
        // },
        bbox,
        transform: {
          translate: {
            x: maybeSub(args.x, bbox.left),
            y: maybeSub(args.y, bbox.top),
          },
        },
      };
    } else {
      throw new Error("Invalid direction");
    }
  };
