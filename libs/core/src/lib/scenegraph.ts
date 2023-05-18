import { createContext, useContext } from 'react';
import { SetStoreFunction, createStore, produce } from 'solid-js/store';
import { getLCAChainSuffixes, getTransformDiff } from './lcaUtil';
import _ from 'lodash';

export type Id = string;

export type BBox = {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
};

export type BBoxOwners = {
  left?: string;
  top?: string;
  width?: string;
  height?: string;
};

export type TransformOwners = {
  translate: {
    x?: string;
    y?: string;
  };
};

function mergeObjects<T, U>(
  obj1: Record<string, T>,
  obj2: Record<string, U>
): Record<string, T | U> {
  const result: Record<string, T | U> = { ...obj1 };

  for (const key in obj2) {
    if (Object.prototype.hasOwnProperty.call(obj2, key)) {
      if (typeof obj2[key] !== 'undefined') {
        result[key] = obj2[key];
      }
    }
  }

  return result;
}

export type Transform = {
  translate: {
    x?: number;
    y?: number;
  };
};

export type ScenegraphNode =
  | {
      type: 'node';
      bbox: BBox;
      transform: Transform;
      bboxOwners: BBoxOwners;
      transformOwners: TransformOwners;
      children: Set<string>;
      parent: string | null;
      // parents?: string[];
      // layout?
      // paint?
    }
  | {
      type: 'ref';
      refId: string;
      transform: Transform;
      parent: string | null;
    };

export type Scenegraph = {
  [key: string]: ScenegraphNode;
};

export const getNode = (
  scenegraph: { [key: string]: ScenegraphNode },
  id: string,
  setScenegraph?: SetStoreFunction<Scenegraph>
): ScenegraphNode & { type: 'node' } => {
  const node = scenegraph[id];
  if (node.type === 'ref') {
    let transform: { translate: { x?: number; y?: number } } = {
      translate: { x: 0, y: 0 },
    };
    let currNode: ScenegraphNode = node;
    while (currNode.type === 'ref') {
      let transformDiff = getTransformDiff(scenegraph, id, currNode.refId);

      if (setScenegraph !== undefined) {
        if (scenegraph[node.refId].type === 'node') {
          // if the refId's translates are fully defined, then define all undefined id translates
          const [idSuffix, refIdSuffix] = getLCAChainSuffixes(
            scenegraph,
            id,
            node.refId
          );
          if (
            _.every(
              [currNode.refId, ...refIdSuffix],
              (id) => scenegraph[id].transform.translate.x !== undefined
            )
          ) {
            for (const id of idSuffix) {
              if (scenegraph[id].transform.translate.x === undefined) {
                setScenegraph(
                  id,
                  produce((node: ScenegraphNode) => {
                    node.transform.translate.x = 0;
                  })
                );
              }
            }
          }
        }

        if (scenegraph[node.refId].type === 'node') {
          // if the refId's translates are fully defined, then define all undefined id translates
          const [idSuffix, refIdSuffix] = getLCAChainSuffixes(
            scenegraph,
            id,
            node.refId
          );
          if (
            _.every(
              [currNode.refId, ...refIdSuffix],
              (id) => scenegraph[id].transform.translate.y !== undefined
            )
          ) {
            for (const id of idSuffix) {
              if (scenegraph[id].transform.translate.y === undefined) {
                setScenegraph(
                  id,
                  produce((node: ScenegraphNode) => {
                    node.transform.translate.y = 0;
                  })
                );
              }
            }
          }
        }
      }

      // add currNode.refId's transform to transformDiff
      const refIdTransform = scenegraph[currNode.refId].transform;
      transformDiff = {
        translate: {
          x:
            transformDiff.translate.x !== undefined &&
            refIdTransform.translate.x !== undefined
              ? transformDiff.translate.x + refIdTransform.translate.x
              : undefined,
          y:
            transformDiff.translate.y !== undefined &&
            refIdTransform.translate.y !== undefined
              ? transformDiff.translate.y + refIdTransform.translate.y
              : undefined,
        },
      };
      const xUndefined =
        transform.translate.x === undefined ||
        transformDiff.translate.x === undefined;
      const yUndefined =
        transform.translate.y === undefined ||
        transformDiff.translate.y === undefined;
      transform = {
        translate: {
          x: !xUndefined
            ? transform.translate.x! + transformDiff.translate.x!
            : undefined,
          y: !yUndefined
            ? transform.translate.y! + transformDiff.translate.y!
            : undefined,
        },
      };
      currNode = scenegraph[currNode.refId];
    }

    return {
      ...currNode,
      transform,
    };
  }
  return node;
};

export const createScenegraph = (): BBoxStore => {
  const [scenegraph, setScenegraph] = createStore<{
    [key: string]: ScenegraphNode;
  }>({});

  // TODO: use a Proxy for each object to make objects appear as simply left, right, top, bottom, etc. even though
  // they are composed of internal dimensions and transform.

  const createNode = (id: string, parentId: string | null) => {
    setScenegraph(id, {
      type: 'node',
      bbox: {},
      bboxOwners: {},
      transform: {
        translate: {},
      },
      transformOwners: {
        translate: {},
      },
      children: new Set(),
      parent: parentId,
    });

    if (parentId !== null) {
      setScenegraph(parentId, (node: ScenegraphNode) => {
        if (node.type === 'ref') {
          console.error('Cannot add children to a ref node.');
          return node;
        }
        return {
          ...node,
          children: new Set([...Array.from(node.children), id]),
        };
      });
    }
  };

  const createRef = (id: string, refId: string, parentId: string | null) => {
    setScenegraph(id, {
      type: 'ref',
      refId,
      transform: {
        translate: {},
      },
      parent: parentId,
    });

    if (parentId !== null) {
      setScenegraph(parentId, (node: ScenegraphNode) => {
        if (node.type === 'ref') {
          console.error('Cannot add children to a ref node.');
          return node;
        }
        return {
          ...node,
          children: new Set([...Array.from(node.children), id]),
        };
      });
    }
  };

  const getCurrentBBox = (
    scenegraph: { [key: string]: ScenegraphNode },
    id: string
  ) => {
    return {
      get left() {
        const node = getNode(scenegraph, id);
        if (
          node.bbox.left === undefined ||
          node.transform.translate.x === undefined
        ) {
          return undefined;
        }

        return node.bbox.left + node.transform.translate.x;
      },
      get top() {
        const node = getNode(scenegraph, id);

        if (
          node.bbox.top === undefined ||
          node.transform.translate.y === undefined
        ) {
          return undefined;
        }

        return node.bbox.top + node.transform.translate.y;
      },
      get width() {
        const node = getNode(scenegraph, id);
        return node.bbox.width;
      },
      get height() {
        const node = getNode(scenegraph, id);
        return node.bbox.height;
      },
    };
  };

  const getBBox = (id: string) => {
    const node = getNode(scenegraph, id, setScenegraph);
    return {
      get left() {
        // const node = getNode(scenegraph, id, setScenegraph);
        if (
          node.bbox.left === undefined ||
          node.transform.translate.x === undefined
        ) {
          return undefined;
        }

        return node.bbox.left + node.transform.translate.x;
      },
      get top() {
        // const node = getNode(scenegraph, id, setScenegraph);

        if (
          node.bbox.top === undefined ||
          node.transform.translate.y === undefined
        ) {
          return undefined;
        }

        return node.bbox.top + node.transform.translate.y;
      },
      get width() {
        // const node = getNode(scenegraph, id, setScenegraph);

        return node.bbox.width;
      },
      get height() {
        // const node = getNode(scenegraph, id, setScenegraph);

        return node.bbox.height;
      },
    };
  };

  const setSmartBBox = (id: string, bbox: BBox, owner: string) => {
    // if any of the bbox values are NaN (undefined is ok), console.error and skip
    if (
      (bbox.left !== undefined && isNaN(bbox.left)) ||
      (bbox.top !== undefined && isNaN(bbox.top)) ||
      (bbox.width !== undefined && isNaN(bbox.width)) ||
      (bbox.height !== undefined && isNaN(bbox.height))
    ) {
      // error message should include id, bbox, owner
      console.error(
        `setSmartBBox: ${owner} tried to update ${id}'s bbox with ${JSON.stringify(
          bbox
        )}, but the bbox contains NaN values. Skipping...`
      );
      return;
    }

    setScenegraph(id, (node: ScenegraphNode) => {
      if (node.type === 'ref') {
        const transform = getTransformDiff(scenegraph, id, node.refId);

        if (
          transform.translate.x === undefined &&
          scenegraph[node.refId].type === 'node'
        ) {
          // set all the x translates in the chains to 0 if they are not yet defined
          const [idSuffix, refIdSuffix] = getLCAChainSuffixes(
            scenegraph,
            id,
            node.refId
          );
          for (const id of idSuffix) {
            if (scenegraph[id].transform.translate.x === undefined) {
              setScenegraph(
                id,
                produce((node: ScenegraphNode) => {
                  node.transform.translate.x = 0;
                })
              );
            }
          }
          for (const id of refIdSuffix) {
            if (scenegraph[id].transform.translate.x === undefined) {
              setScenegraph(
                id,
                produce((node: ScenegraphNode) => {
                  node.transform.translate.x = 0;
                })
              );
            }
          }
        }

        if (
          transform.translate.y === undefined &&
          scenegraph[node.refId].type === 'node'
        ) {
          // set all the y translates in the chains to 0 if they are not yet defined
          const [idSuffix, refIdSuffix] = getLCAChainSuffixes(
            scenegraph,
            id,
            node.refId
          );
          for (const id of idSuffix) {
            if (scenegraph[id].transform.translate.y === undefined) {
              setScenegraph(
                id,
                produce((node: ScenegraphNode) => {
                  node.transform.translate.y = 0;
                })
              );
            }
            for (const id of refIdSuffix) {
              if (scenegraph[id].transform.translate.y === undefined) {
                setScenegraph(
                  id,
                  produce((node: ScenegraphNode) => {
                    node.transform.translate.y = 0;
                  })
                );
              }
            }
          }
        }

        const newBBox = {
          left:
            bbox.left !== undefined
              ? bbox.left - (transform.translate.x ?? 0)
              : undefined,
          top:
            bbox.top !== undefined
              ? bbox.top - (transform.translate.y ?? 0)
              : undefined,
          width: bbox.width,
          height: bbox.height,
        };

        setSmartBBox(node.refId, newBBox, owner);
        return node;
      }

      // if left and translate.x are both undefined, then set left to the input value and set
      // translate.x to 0.
      // if left is defined, and translate.x is undefined, then set translate.x to the difference
      // between the input value and left.
      // if both are defined, then check ownership. If there's an ownership conflict, then
      // console.error and return
      // if left and translate.x are both owned by us, then set left to the input value and set
      // translate.x to 0.
      // if left is owned by someone else, and translate.x is owned by us, then set translate.x

      if (
        bbox.left !== undefined &&
        node.transformOwners.translate.x !== undefined &&
        node.transformOwners.translate.x !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s left to ${
            bbox.left
          } but it was already set to ${
            (node.bbox.left ?? 0) + (node.transform.translate.x ?? 0)
          } by ${
            node.transformOwners.translate.x
          }. Only one component can set a bbox property. We skipped this update.`
        );
        return node;
      } else if (
        bbox.top !== undefined &&
        node.transformOwners.translate.y !== undefined &&
        node.transformOwners.translate.y !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s top to ${
            bbox.top
          } but it was already set to ${
            (node.bbox.top ?? 0) + (node.transform.translate.y ?? 0)
          } by ${
            node.transformOwners.translate.y
          }. Only one component can set a bbox property. We skipped this update.`
        );
        return node;
      }
      // TODO: there are a bunch of other cases to consider, but I don't think they'll come up just
      // yet so we'll skip them...

      const proposedBBox: BBox = {};
      const proposedTransform: Transform = {
        translate: {},
      };

      if (bbox.left !== undefined) {
        if (node.bboxOwners.left === owner) {
          proposedBBox.left = bbox.left;
          proposedTransform.translate.x = 0;
        } else if (node.transformOwners.translate.x === owner) {
          proposedTransform.translate.x = bbox.left - node.bbox.left!;
        }
      }

      if (bbox.top !== undefined) {
        if (node.bboxOwners.top === owner) {
          proposedBBox.top = bbox.top;
          proposedTransform.translate.y = 0;
        } else if (node.transformOwners.translate.y === owner) {
          proposedTransform.translate.y = bbox.top - node.bbox.top!;
        }
      }

      const newBBoxOwners = {
        ...node.bboxOwners,
        ...(bbox.left !== undefined && node.bboxOwners.left === undefined
          ? { left: owner }
          : {}),
        ...(bbox.top !== undefined && node.bboxOwners.top === undefined
          ? { top: owner }
          : {}),
        // ...(bbox.width ? { width: owner } : {}),
        // ...(bbox.height ? { height: owner } : {}),
      };

      const newTransformOwners: TransformOwners = {
        translate: {
          x:
            node.transformOwners.translate.x ??
            (bbox.left !== undefined ? owner : undefined),
          y:
            node.transformOwners.translate.y ??
            (bbox.top !== undefined ? owner : undefined),
        },
      };

      const newBBox = mergeObjects(node.bbox, proposedBBox);

      const newTranslate = mergeObjects(
        node.transform.translate,
        proposedTransform.translate
      );

      const newTransform = {
        translate: newTranslate,
      };

      return {
        bbox: newBBox,
        bboxOwners: newBBoxOwners,
        transform: newTransform,
        transformOwners: newTransformOwners,
        children: node.children,
      };
    });
  };

  const setBBox = (
    id: string,
    bbox: Partial<BBox>,
    owner: string,
    transform?: Transform
  ) => {
    setScenegraph(id, (node: ScenegraphNode) => {
      if (node.type === 'ref') {
        // console.error("Mutating refs is not currently supported. Skipping.");
        // return node;
        setBBox(node.refId, bbox, owner, transform);
        return node;
      }
      if (
        bbox.left !== undefined &&
        node.bboxOwners.left !== undefined &&
        node.bboxOwners.left !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s left to ${bbox.left} but it was already set by ${node.bboxOwners.left}. Only one component can set a bbox property. We skipped this update.`
        );
        return node;
      } else if (
        bbox.top !== undefined &&
        node.bboxOwners.top !== undefined &&
        node.bboxOwners.top !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s top to ${bbox.top} but it was already set by ${node.bboxOwners.top}. Only one component can set a bbox property. We skipped this update.`
        );
        return node;
      } else if (
        bbox.width !== undefined &&
        node.bboxOwners.width !== undefined &&
        node.bboxOwners.width !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s width to ${bbox.width} but it was already set by ${node.bboxOwners.width}. Only one component can set a bbox property. We skipped this update.`
        );
        return node;
      } else if (
        bbox.height !== undefined &&
        node.bboxOwners.height !== undefined &&
        node.bboxOwners.height !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s height to ${bbox.height} but it was already set by ${node.bboxOwners.height}. Only one component can set a bbox property. We skipped this update.`
        );
        return node;
      } else if (
        transform?.translate.x !== undefined &&
        node.transformOwners.translate.x !== undefined &&
        node.transformOwners.translate.x !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s translate.x to ${transform.translate.x} but it was already set by ${node.transformOwners.translate.x}. Only one component can set a transform property. We skipped this update.`
        );
        return node;
      } else if (
        transform?.translate.y !== undefined &&
        node.transformOwners.translate.y !== undefined &&
        node.transformOwners.translate.y !== owner
      ) {
        console.error(
          `${owner} tried to set ${id}'s translate.y to ${transform.translate.y} but it was already set by ${node.transformOwners.translate.y}. Only one component can set a transform property. We skipped this update.`
        );
        return node;
      }

      const newBBoxOwners = {
        ...node.bboxOwners,
        ...(bbox.left !== undefined ? { left: owner } : {}),
        ...(bbox.top !== undefined ? { top: owner } : {}),
        ...(bbox.width !== undefined ? { width: owner } : {}),
        ...(bbox.height !== undefined ? { height: owner } : {}),
      };

      const newTransformOwners: TransformOwners = {
        translate: {
          x:
            node.transformOwners.translate.x ??
            (transform?.translate.x !== undefined ? owner : undefined),
          y:
            node.transformOwners.translate.y ??
            (transform?.translate.y !== undefined ? owner : undefined),
        },
      };

      // merge currentBbox and bbox, but don't overwrite currentBbox values with undefined
      const newBBox = mergeObjects(node.bbox, bbox);

      const newTranslate = mergeObjects(
        node.transform.translate,
        transform?.translate ?? {}
      );

      const newTransform = {
        translate: newTranslate,
      };

      return {
        bbox: newBBox,
        bboxOwners: newBBoxOwners,
        transform: newTransform,
        transformOwners: newTransformOwners,
        children: node.children,
      };
    });
  };

  return [
    scenegraph,
    {
      getBBox,
      setSmartBBox,
      setBBox,
      createNode,
      createRef,
      getCurrentBBox,
      getNode,
    },
  ];
};

export type BBoxStore = [
  get: { [key: string]: ScenegraphNode },
  set: {
    // TODO: move this out of set...
    getBBox: (id: string) => BBox;
    getCurrentBBox: (
      scenegraph: { [key: string]: ScenegraphNode },
      id: string
    ) => BBox;
    getNode: (
      scenegraph: { [key: string]: ScenegraphNode },
      id: string
    ) => ScenegraphNode & { type: 'node' };
    setSmartBBox: (id: string, bbox: BBox, owner: string) => void;
    setBBox: (
      id: string,
      bbox: Partial<BBox>,
      owner: string,
      transform?: Transform
    ) => void;
    createNode: (id: string, parentId: string | null) => void;
    createRef: (id: string, refId: string, parentId: string | null) => void;
  }
];

export const BBoxContext = createContext<BBoxStore | null>(null);

export const useScenegraph = (): [
  get: { [key: string]: ScenegraphNode },
  set: (
    id: string,
    bbox: Partial<BBox>,
    owner: string,
    transform?: Transform
  ) => void,
  smartGet: (id: string) => BBox,
  smartSet: (id: string, bbox: BBox, owner: string) => void,
  getNode: (
    scenegraph: { [key: string]: ScenegraphNode },
    id: string
  ) => ScenegraphNode & { type: 'node' }
] => {
  const context = useContext(BBoxContext);

  if (context === null) {
    throw new Error(
      'useScenegraph must be used within a top-level Bluefish component.'
    );
  }

  const [scenegraph, { setBBox, getBBox, setSmartBBox, getNode }] = context;
  return [scenegraph, setBBox, getBBox, setSmartBBox, getNode];
};

export const ParentIDContext = createContext<string | null>(null);
