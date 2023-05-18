import React, { useCallback } from 'react';
import { Id, Layout } from '@bluefishjs/core';
import { BBox, Transform, useScenegraph } from '@bluefishjs/core';

export type RowProps = {
  x?: number;
  y?: number;
  spacing: number;
  children: React.ReactNode;
  id: string;
};

export function Row(props: RowProps) {
  const { x, y, spacing, children, id } = props;
  const [scenegraph, setNode, getBBox] = useScenegraph();

  const layout = useCallback(
    (childIds: Id[]) => {
      let posX = 0;

      for (const childId of childIds) {
        // const childBBox = scenegraph[childId]?.bbox;
        const childBBox = getBBox(childId);
        if (childBBox !== undefined) {
          setNode(childId, {}, id, {
            translate: { x: posX, y: 0 },
          });
          posX += (childBBox?.width ?? 0) + spacing;
        }
      }

      const width = posX - spacing;
      // height is the max height of all children
      const height = Math.max(
        ...childIds.map((childId) => getBBox(childId).height ?? 0)
      );
      // console.timeEnd("layout");

      return {
        bbox: {
          left: 0,
          top: 0,
          width,
          height,
        },
        transform: {
          translate: {
            x: x,
            y: y,
          },
        },
      };
    },
    [getBBox, id, setNode, spacing, x, y]
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

export default Row;
