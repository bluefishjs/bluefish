import React, { useCallback, PropsWithChildren } from 'react';
import { Id, Layout } from '@bluefishjs/core';
import { BBox, Transform, useScenegraph } from '@bluefishjs/core';
import _ from 'lodash';

export type Alignment2D =
  | 'topLeft'
  | 'topCenter'
  | 'topRight'
  | 'centerLeft'
  | 'center'
  | 'centerRight'
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight';

// generate a union of single-key objects using Alignment2D as the keys
export type Alignment2DObjs = {
  [K in Alignment2D]: { [k in K]: boolean };
}[Alignment2D];

export type VerticalAlignment = 'top' | 'center' | 'bottom';
export type HorizontalAlignment = 'left' | 'center' | 'right';

export type Alignment1DHorizontal = 'left' | 'centerHorizontally' | 'right';
export type Alignment1DVertical = 'top' | 'centerVertically' | 'bottom';

export type Alignment1D = Alignment1DHorizontal | Alignment1DVertical;

export type Alignment1DObjs = {
  [K in Alignment1D]: { [k in K]: boolean };
}[Alignment1D];

export type AlignAuxProps = {
  alignments: [
    VerticalAlignment | undefined,
    HorizontalAlignment | undefined
  ][];
} & {
  x?: number;
  y?: number;
};

export const splitAlignment = (
  alignment: Alignment2D | Alignment1D
): [VerticalAlignment | undefined, HorizontalAlignment | undefined] => {
  let verticalAlignment: VerticalAlignment | undefined;
  let horizontalAlignment: HorizontalAlignment | undefined;
  switch (alignment) {
    case 'top':
    case 'topLeft':
    case 'topCenter':
    case 'topRight':
      verticalAlignment = 'top';
      break;
    case 'centerVertically':
    case 'centerLeft':
    case 'center':
    case 'centerRight':
      verticalAlignment = 'center';
      break;
    case 'bottom':
    case 'bottomLeft':
    case 'bottomCenter':
    case 'bottomRight':
      verticalAlignment = 'bottom';
      break;
  }

  switch (alignment) {
    case 'left':
    case 'topLeft':
    case 'centerLeft':
    case 'bottomLeft':
      horizontalAlignment = 'left';
      break;
    case 'centerHorizontally':
    case 'topCenter':
    case 'center':
    case 'bottomCenter':
      horizontalAlignment = 'center';
      break;
    case 'right':
    case 'topRight':
    case 'centerRight':
    case 'bottomRight':
      horizontalAlignment = 'right';
      break;
  }

  return [verticalAlignment, horizontalAlignment];
};

type AlignProps = PropsWithChildren<{
  id: Id;
  x?: number;
  y?: number;
  alignment?: Alignment2D | Alignment1D;
}>;

export function Align(props: AlignProps) {
  const { children, id } = props;
  const [scenegraph, setNode, getBBox, setSmartBBox, getNode] = useScenegraph();

  const layout = useCallback(
    (childIds: Id[]) => {
      // TODO: this is currently side-effectful and cannot be removed. I think this is because the ref
      // bbox is not updated until it is read, and this update does not seem propagate until the
      // next read.
      // we either need to change how we maintain ref invariants, or we just need to call getBBox
      // before invoking layout
      childIds.forEach(getBBox);

      const alignments: [
        VerticalAlignment | undefined,
        HorizontalAlignment | undefined
      ][] = childIds
        .map((m) => /* m.guidePrimary ?? */ props.alignment)
        .map((alignment) =>
          alignment !== undefined
            ? splitAlignment(alignment)
            : [undefined, undefined]
        );

      const verticalPlaceables = _.zip(childIds, alignments).filter(
        ([placeable, alignment]) => {
          if (alignment === undefined) {
            return false;
          }
          const [verticalAlignment, horizontalAlignment] = alignment;
          return verticalAlignment !== undefined;
        }
      );

      const horizontalPlaceables = _.zip(childIds, alignments).filter(
        ([placeable, alignment]) => {
          if (alignment === undefined) {
            return false;
          }
          const [verticalAlignment, horizontalAlignment] = alignment;
          return horizontalAlignment !== undefined;
        }
      );

      // TODO: should be able to filter by ownership instead
      const verticalValueArr = verticalPlaceables
        .map(([placeable, alignment]) => {
          const [verticalAlignment, horizontalAlignment] = alignment!;
          if (verticalAlignment === 'top') {
            return [placeable, getBBox(placeable!).top];
          } else if (verticalAlignment === 'center') {
            const top = getBBox(placeable!).top;
            const height = getBBox(placeable!).height;
            if (top === undefined || height === undefined) {
              return [placeable, undefined];
            }
            return [placeable, top + height / 2];
          } else if (verticalAlignment === 'bottom') {
            // return getBBox(placeable!).bottom;
            return [
              placeable,
              getBBox(placeable!).top! + getBBox(placeable!).height!,
            ];
          } else {
            return [placeable, undefined];
          }
        })
        .filter(
          ([placeable, value]) =>
            // scenegraph[placeable!].transformOwners.translate.y !== id &&
            getNode(scenegraph, placeable! as any).transformOwners.translate
              .y !== id && value !== undefined
        );

      const verticalValue =
        verticalValueArr.length === 0 ? 0 : (verticalValueArr[0][1] as number);
      // TODO: we maybe have the invariant that value is always defined when the placeable is owned...

      const horizontalValueArr = horizontalPlaceables
        .map(([placeable, alignment]) => {
          const [verticalAlignment, horizontalAlignment] = alignment!;
          if (horizontalAlignment === 'left') {
            return [placeable, getBBox(placeable!).left];
          } else if (horizontalAlignment === 'center') {
            const left = getBBox(placeable!).left;
            const width = getBBox(placeable!).width;
            if (left === undefined || width === undefined) {
              return [placeable, undefined];
            }
            return [placeable, left + width / 2];
          } else if (horizontalAlignment === 'right') {
            // return getBBox(placeable!).right;
            return [
              placeable,
              getBBox(placeable!).left! + getBBox(placeable!).width!,
            ];
          } else {
            return [placeable, undefined];
          }
        })
        .filter(
          ([placeable, value]) =>
            // scenegraph[placeable!].transformOwners.translate.x !== id &&
            getNode(scenegraph, placeable! as any).transformOwners.translate
              .x !== id && value !== undefined
        );

      const horizontalValue =
        horizontalValueArr.length === 0
          ? 0
          : (horizontalValueArr[0][1] as number);

      for (const [placeable, alignment] of verticalPlaceables) {
        if (
          // scenegraph[placeable!].transformOwners.translate.y !== undefined &&
          // scenegraph[placeable!].transformOwners.translate.y !== id
          getNode(scenegraph, placeable! as any).transformOwners.translate.y !==
            undefined &&
          getNode(scenegraph, placeable! as any).transformOwners.translate.y !==
            id
        )
          continue;
        const [verticalAlignment, horizontalAlignment] = alignment!;
        if (verticalAlignment === 'top') {
          setSmartBBox(placeable!, { top: verticalValue }, id);
        } else if (verticalAlignment === 'center') {
          const height = getBBox(placeable!).height;
          if (height === undefined) {
            continue;
          }
          setSmartBBox(placeable!, { top: verticalValue - height / 2 }, id);
        } else if (verticalAlignment === 'bottom') {
          // placeable!.bottom = verticalValue;
          setSmartBBox(
            placeable!,
            { top: verticalValue - getBBox(placeable!).height! },
            id
          );
        }
      }

      for (const [placeable, alignment] of horizontalPlaceables) {
        if (
          // scenegraph[placeable!].transformOwners.translate.x !== undefined &&
          // scenegraph[placeable!].transformOwners.translate.x !== id
          getNode(scenegraph, placeable! as any).transformOwners.translate.x !==
            undefined &&
          getNode(scenegraph, placeable! as any).transformOwners.translate.x !==
            id
        )
          continue;
        const [verticalAlignment, horizontalAlignment] = alignment!;
        if (horizontalAlignment === 'left') {
          setSmartBBox(placeable!, { left: horizontalValue }, id);
        } else if (horizontalAlignment === 'center') {
          const width = getBBox(placeable!).width;
          if (width === undefined) {
            continue;
          }
          setSmartBBox(placeable!, { left: horizontalValue - width / 2 }, id);
        } else if (horizontalAlignment === 'right') {
          // placeable!.right = horizontalValue;
          setSmartBBox(
            placeable!,
            { left: horizontalValue - getBBox(placeable!).width! },
            id
          );
        }
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

      const width =
        left !== undefined && right !== undefined ? right - left : undefined;
      const height =
        top !== undefined && bottom !== undefined ? bottom - top : undefined;

      return {
        transform: {
          translate: {
            x:
              props.x !== undefined && left !== undefined
                ? props.x - left
                : undefined,
            y:
              props.y !== undefined && top !== undefined
                ? props.y - top
                : undefined,
          },
        },
        bbox: { left, top, right, bottom, width, height },
      };
    },
    [
      getBBox,
      getNode,
      id,
      props.alignment,
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
      {children}
    </Layout>
  );
}
Align.displayName = 'Align';

export default Align;
