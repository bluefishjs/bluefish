import _ from 'lodash';
import { measureText } from './measureText';
import { useCallback, useMemo } from 'react';
import { BBox, Layout, Transform } from '@bluefishjs/core';

// TODO: allow text within the text element instead of on contents arg

export type TextProps = React.SVGProps<SVGTextElement> & {
  contents: string;
} & Partial<{
    x: number;
    y: number;
  }> & { id: string };

export function Text(props: TextProps) {
  const { id, ...rest } = props;

  const partialNoUndef = _.pickBy(props, (v) => v !== undefined);
  const {
    fontStyle = 'normal',
    fontWeight = 'sans-serif',
    fontSize = '12px',
    fontFamily = 'normal',
  } = partialNoUndef;

  const measurements = useMemo(
    () =>
      measureText(
        props.contents,
        `${fontStyle ?? ''} ${fontWeight ?? ''} ${fontSize ?? ''} ${
          fontFamily ?? ''
        }`
      ),
    [fontFamily, fontSize, fontStyle, fontWeight, props.contents]
  );

  // TODO: use 'alphabetic' baseline in renderer? may need to figure out displacement again
  // TODO: maybe use https://airbnb.io/visx/docs/text?
  // TODO: maybe use alignmentBaseline="baseline" to measure the baseline as well?? need to add it as
  // a guide
  // TODO: very close to good alignment, but not quite there. Can I use more of the canvas
  // measurements somehow?
  const layout = useCallback(() => {
    return {
      bbox: {
        left: measurements.left,
        // right: measurements.right,
        width: measurements.right - measurements.left,
        top: measurements.fontTop,
        height: measurements.fontHeight,
        // bottom: measurements.fontDescent,
      },
      transform: {
        translate: {
          x: props.x,
          y: props.y,
        },
      },
      // top: 0,
      /* width: measurements.width, */
      // height: measurements.fontHeight,
    };
  }, [
    measurements.fontHeight,
    measurements.fontTop,
    measurements.left,
    measurements.right,
    props.x,
    props.y,
  ]);

  const paint = useCallback(
    ({ bbox, transform }: { bbox: BBox; transform: Transform }) => {
      return (
        <g
          // visibility={hidden === true ? 'hidden' : 'visible'}
          // id={id}
          // ref={domRef}
          transform={`translate(${transform.translate?.x ?? 0} ${
            transform.translate?.y ?? 0
          })`}
        >
          <text
            {...rest}
            x={bbox?.left ?? 0}
            // TODO: need some way to pass fontDescent here
            // TODO: is height always defined?
            y={
              (bbox?.top ?? 0) +
              (bbox?.height !== undefined
                ? +bbox.height
                : 0) /* - measurements.fontDescent */
            }
          >
            {props.contents}
          </text>
        </g>
      );
    },
    [props.contents, rest]
  );

  return <Layout id={id} layout={layout} paint={paint} />;
}
