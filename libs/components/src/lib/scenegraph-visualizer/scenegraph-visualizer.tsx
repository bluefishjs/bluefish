import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Scenegraph, ScenegraphNode, getNode } from '@bluefishjs/core';
import Tree, { RawNodeDatum } from 'react-d3-tree';
import {
  getAncestorChain,
  getLCAChain,
  getLCAChainSuffixes,
  getTransformDiff,
} from '@bluefishjs/core';
import { useForceUpdate } from '@bluefishjs/core';

// https://css-tricks.com/using-requestanimationframe-with-react-hooks/
const useAnimationFrame = (
  callback: (deltaTime: DOMHighResTimeStamp) => void
) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number | undefined>();
  const previousTimeRef = useRef<DOMHighResTimeStamp | undefined>();

  const animate = useCallback(
    (time: DOMHighResTimeStamp) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]);
};

export type ScenegraphVisualizerProps = {
  id: string;
};

const stringify = (obj: any, indent: string = ''): string => {
  let str = '';
  const isArray = Array.isArray(obj);

  for (const [key, value] of Object.entries(obj)) {
    str += `${indent}${isArray ? '' : key + ': '}`;

    if (typeof value === 'object' && value !== null) {
      str += `{\n${stringify(value, indent + '  ')}\n${indent}}, `;
    } else {
      str += `${value}, `;
    }
  }

  return str.replace(/, $/, '');
};

// recursively parse the scenegraph into a tree
const parseScenegraph = (
  scenegraph: Scenegraph,
  tree: {
    [key: string]: ScenegraphNode;
  },
  root: string
): RawNodeDatum => {
  const node = tree[root];
  const children =
    node.type === 'node'
      ? Array.from(node.children).map((child) =>
          parseScenegraph(scenegraph, tree, child)
        )
      : [];

  if (node.type === 'node') {
    return {
      name: root,
      children,
      attributes: {
        type: node.type,
        transform: `{ ${stringify(node.transform)} }`,
        bbox: `{ ${stringify(node.bbox)} }`,
      },
    };
  } else if (node.type === 'ref') {
    return {
      name: root,
      children,
      attributes: {
        type: node.type,
        transform: `{ ${stringify(node.transform)} }`,
        rootChain: JSON.stringify(getAncestorChain(scenegraph, root)),
        refIdChain: JSON.stringify(getAncestorChain(scenegraph, node.refId)),
        lcaChainSuffixes: JSON.stringify(
          getLCAChainSuffixes(scenegraph, root, node.refId)
        ),
        lcaChainSuffixesTransforms: JSON.stringify([
          getLCAChainSuffixes(scenegraph, root, node.refId)[0].map(
            (id) => getNode(scenegraph, id).transform
          ),
          getLCAChainSuffixes(scenegraph, root, node.refId)[1].map(
            (id) => getNode(scenegraph, id).transform
          ),
        ]),
        transformDiff: `{ ${stringify(
          getTransformDiff(scenegraph, root, node.refId)
        )} }`,
        bbox: `{ ${stringify(getNode(scenegraph, root).bbox)} }`,
        refTransform: `{ ${stringify(getNode(scenegraph, root).transform)} }`,
      },
    };
  } else {
    throw new Error(`Unknown node type ${(node as any).type}`);
  }
};

export function ScenegraphVisualizer(props: ScenegraphVisualizerProps) {
  const [tree, setTree] = useState<{ [key: string]: ScenegraphNode }>();
  const forceUpdate = useForceUpdate();

  useAnimationFrame((_deltaTime) => {
    if (window.bluefish !== undefined && props.id in window.bluefish) {
      setTree(window.bluefish[props.id]);
      forceUpdate();
    }
  });

  const parsedTree =
    tree === undefined ? undefined : parseScenegraph(tree, tree, props.id);

  return (
    <div style={{ width: '50em', height: '50em', border: '1px solid black' }}>
      {parsedTree !== undefined ? (
        <Tree
          // orientation="vertical"
          translate={{ x: 200, y: 20 }}
          data={parsedTree}
          draggable
          collapsible={false}
          pathFunc="step"
          nodeSize={{
            x: 140,
            y: 300,
          }}
        />
      ) : null}
    </div>
  );
}

export default ScenegraphVisualizer;
