import { PropsWithChildren, useCallback } from 'react';
import { Id, Layout } from '@bluefishjs/core';
import { BBox, Transform, useScenegraph } from '@bluefishjs/core';
import _ from 'lodash';

export type DistributeProps = PropsWithChildren<{
  id: Id;
  x?: number;
  y?: number;
  direction: 'vertical' | 'horizontal';
  total?: number;
  spacing?: number;
}>;

export function Distribute(props: DistributeProps) {
  const [scenegraph, setNode, getBBox, setSmartBBox, getNode] = useScenegraph();

  const layout = useCallback(
    (childIds: Id[]) => {
      childIds.forEach(getBBox);

      const childNodes = Object.fromEntries(
        childIds.map((id) => [id, getNode(scenegraph, id)])
      );

      if (props.direction === 'vertical') {
        const [ownedHeight, unownedHeight] = _.partition(
          Object.entries(childNodes),
          ([_, node]) =>
            node.bboxOwners.height === props.id ||
            node.bboxOwners.height === undefined
        );

        // now we determine the total height and spacing.
        let height: number;
        let spacing: number;
        if (props.spacing !== undefined && props.total !== undefined) {
          spacing = props.spacing;
          height = props.total;
          const existingHeight = _.sumBy(
            unownedHeight,
            ([_, node]) => node.bbox.height!
          );

          // subtract off the height of elements we don't own
          const remainingHeight =
            height - existingHeight - spacing * (childIds.length - 1);

          const distributedHeight = remainingHeight / ownedHeight.length;
          for (const [id, node] of ownedHeight) {
            setSmartBBox(id, { height: distributedHeight }, props.id);
          }
        } else if (props.spacing !== undefined) {
          // all of the children's height must be known
          if (ownedHeight.length > 0) {
            console.error(
              "Distribute cannot determine the total height, because not all of the children's heights are known."
            );
            return {
              transform: {
                translate: {},
              },
              bbox: {
                top: 0,
                height: 0,
              },
            };
          }
          spacing = props.spacing;
          height =
            _.sumBy(
              Object.entries(childNodes),
              ([_, node]) => node.bbox.height!
            ) +
            spacing * (childIds.length - 1);
        } else if (props.total !== undefined) {
          if (ownedHeight.length > 0) {
            console.error(
              "Distribute cannot determine the spacing, because not all of the children's heights are known."
            );
            return {
              transform: {
                translate: {},
              },
              bbox: {
                top: 0,
                height: 0,
              },
            };
          }
          height = props.total;
          const occupiedHeight = _.sumBy(
            Object.entries(childNodes),
            ([_, node]) => node.bbox.height!
          );
          spacing = (props.total - occupiedHeight) / (childIds.length - 1);
        } else {
          throw new Error('invalid options');
        }

        const childBBoxes = Object.fromEntries(
          childIds.map((id) => [id, getBBox(id)])
        );

        const fixedElement = Object.values(childNodes).findIndex(
          (node) =>
            node.transformOwners.translate.y !== undefined &&
            node.transformOwners.translate.y !== props.id
        );

        const fixedId = childIds[fixedElement];

        // use spacing and height to evenly distribute elements while ensuring that the fixed element
        // is fixed
        const startingY =
          fixedElement === -1
            ? 0
            : childBBoxes[fixedId].top! -
              spacing * fixedElement -
              _.sumBy(
                Object.entries(childBBoxes).slice(0, fixedElement),
                'height'
              );

        // subtract off spacing and the sizes of the first fixedElement elements
        let y = startingY;
        for (const id of childIds) {
          if (id !== fixedId) {
            setSmartBBox(id, { top: y }, props.id);
          }
          y += childBBoxes[id].height! + spacing;
        }

        const left = _.some(
          childIds.map((childId) => getBBox(childId).left),
          _.isUndefined
        )
          ? undefined
          : _.min(childIds.map((childId) => getBBox(childId).left));

        const right =
          _.some(
            childIds.map((childId) => getBBox(childId).left),
            _.isUndefined
          ) ||
          _.some(
            childIds.map((childId) => getBBox(childId).width),
            _.isUndefined
          )
            ? undefined
            : _.max(
                childIds.map(
                  (childId) => getBBox(childId).left! + getBBox(childId).width!
                )
              );

        const width =
          left !== undefined && right !== undefined ? right - left : undefined;

        return {
          transform: {
            translate: {
              x:
                props.x !== undefined && left !== undefined
                  ? props.x - left
                  : 0,
              y: props.y !== undefined ? props.y - startingY : 0,
            },
          },
          bbox: {
            top: startingY,
            left,
            width,
            height,
          },
        };
      } else if (props.direction === 'horizontal') {
        const [ownedWidth, unownedWidth] = _.partition(
          Object.entries(childNodes),
          ([_, node]) =>
            node.bboxOwners.width === props.id ||
            node.bboxOwners.width === undefined
        );

        // now we determine the total width and spacing.
        let width: number;
        let spacing: number;
        if (props.spacing !== undefined && props.total !== undefined) {
          spacing = props.spacing;
          width = props.total;
          const existingWidth = _.sumBy(
            unownedWidth,
            ([_, node]) => node.bbox.width!
          );

          // subtract off the width of elements we don't own
          const remainingWidth =
            width - existingWidth - spacing * (childIds.length - 1);

          const distributedWidth = remainingWidth / ownedWidth.length;
          for (const [id, node] of ownedWidth) {
            setSmartBBox(id, { width: distributedWidth }, props.id);
          }
        } else if (props.spacing !== undefined) {
          // all of the children's width must be known
          if (ownedWidth.length > 0) {
            console.error(
              "Distribute cannot determine the total width, because not all of the children's widths are known."
            );
            return {
              transform: {
                translate: {},
              },
              bbox: {
                left: 0,
                width: 0,
              },
            };
          }
          spacing = props.spacing;
          width =
            _.sumBy(
              Object.entries(childNodes),
              ([_, node]) => node.bbox.width!
            ) +
            spacing * (childIds.length - 1);
        } else if (props.total !== undefined) {
          if (ownedWidth.length > 0) {
            console.error(
              "Distribute cannot determine the spacing, because not all of the children's widths are known."
            );
            return {
              transform: {
                translate: {},
              },
              bbox: {
                left: 0,
                width: 0,
              },
            };
          }
          width = props.total;
          const occupiedWidth = _.sumBy(
            Object.entries(childNodes),
            ([_, node]) => node.bbox.width!
          );
          spacing = (props.total - occupiedWidth) / (childIds.length - 1);
        } else {
          throw new Error('invalid options');
        }

        const childBBoxes = Object.fromEntries(
          childIds.map((id) => [id, getBBox(id)])
        );

        const fixedElement = Object.values(childNodes).findIndex(
          (node) =>
            node.transformOwners.translate.x !== undefined &&
            node.transformOwners.translate.x !== props.id
        );

        const fixedId = childIds[fixedElement];

        // use spacing and width to evenly distribute elements while ensuring that the fixed element
        // is fixed
        const startingX =
          fixedElement === -1
            ? 0
            : childBBoxes[fixedId].left! -
              spacing * fixedElement -
              _.sumBy(
                Object.entries(childBBoxes).slice(0, fixedElement),
                'width'
              );

        // subtract off spacing and the sizes of the first fixedElement elements
        let x = startingX;
        for (const id of childIds) {
          if (id !== fixedId) {
            setSmartBBox(id, { left: x }, props.id);
          }
          x += childBBoxes[id].width! + spacing;
        }

        const top = _.some(
          childIds.map((childId) => getBBox(childId).top),
          _.isUndefined
        )
          ? undefined
          : _.min(childIds.map((childId) => getBBox(childId).top));

        const bottom =
          _.some(
            childIds.map((childId) => getBBox(childId).top),
            _.isUndefined
          ) ||
          _.some(
            childIds.map((childId) => getBBox(childId).height),
            _.isUndefined
          )
            ? undefined
            : _.max(
                childIds.map(
                  (childId) => getBBox(childId).top! + getBBox(childId).height!
                )
              );

        const height =
          top !== undefined && bottom !== undefined ? bottom - top : undefined;

        return {
          transform: {
            translate: {
              x: props.x !== undefined ? props.x - startingX : undefined,
              y:
                props.y !== undefined && top !== undefined
                  ? props.y - top
                  : undefined,
            },
          },
          bbox: {
            top,
            left: startingX,
            height,
            width,
          },
        };
      } else {
        throw new Error('Invalid options for Distribute.');
      }
    },
    [
      getBBox,
      getNode,
      props.direction,
      props.id,
      props.spacing,
      props.total,
      props.x,
      props.y,
      scenegraph,
      setSmartBBox,
    ]
  );

  const paint = useCallback(
    ({
      bbox,
      children,
      transform,
    }: {
      bbox: BBox;
      transform: Transform;
      children: React.ReactNode;
    }) => (
      <g
        transform={`translate(${transform.translate.x ?? 0}, ${
          transform.translate.y ?? 0
        })`}
      >
        {children}
      </g>
    ),
    []
  );

  return (
    <Layout id={props.id} layout={layout} paint={paint}>
      {props.children}
    </Layout>
  );
}
Distribute.displayName = 'Distribute';

export default Distribute;
