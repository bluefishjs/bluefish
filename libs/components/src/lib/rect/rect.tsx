import React, { useCallback } from 'react';
import { Layout } from '@bluefishjs/core';
import { BBox, Transform } from '@bluefishjs/core';

export type RectProps = {
  id: string;
  x?: number;
  y?: number;
  width: number;
  height: number;
  fill: string;
};

export function Rect(props: RectProps) {
  const { id, x, y, width, height, fill } = props;

  const layout = useCallback(() => {
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
  }, [height, width, x, y]);

  const paint = useCallback(
    ({ bbox, transform }: { bbox: BBox; transform: Transform }) => {
      return (
        <rect
          x={(bbox.left ?? 0) + (transform.translate.x ?? 0)}
          y={(bbox.top ?? 0) + (transform.translate.y ?? 0)}
          width={bbox.width}
          height={bbox.height}
          fill={fill}
        />
      );
    },
    [fill]
  );

  return <Layout id={id} layout={layout} paint={paint} />;
}

export default Rect;
