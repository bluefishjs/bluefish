import { Scenegraph } from './scenegraph';

export const getAncestorChain = (
  scenegraph: Scenegraph,
  id: string
): string[] => {
  const chain = [];
  let node = scenegraph[id];
  while (node.parent !== null) {
    chain.push(node.parent);
    node = scenegraph[node.parent];
  }
  return chain.reverse();
};

export const getLCAChain = (
  scenegraph: Scenegraph,
  id1: string,
  id2: string
): string[] => {
  const chain1 = getAncestorChain(scenegraph, id1);
  const chain2 = getAncestorChain(scenegraph, id2);

  const lcaChain = [];
  for (let i = 0; i < Math.min(chain1.length, chain2.length); i++) {
    if (chain1[i] === chain2[i]) {
      lcaChain.push(chain1[i]);
    } else {
      break;
    }
  }

  return lcaChain;
};

// like getLCAChain, but returns the suffixes of the chains instead
export const getLCAChainSuffixes = (
  scenegraph: Scenegraph,
  id1: string,
  id2: string
): [string[], string[]] => {
  const chain1 = getAncestorChain(scenegraph, id1);
  const chain2 = getAncestorChain(scenegraph, id2);

  const lcaChain = [];
  for (let i = 0; i < Math.min(chain1.length, chain2.length); i++) {
    if (chain1[i] === chain2[i]) {
      lcaChain.push(chain1[i]);
    } else {
      break;
    }
  }

  return [chain1.slice(lcaChain.length), chain2.slice(lcaChain.length)];
};

export const getTransformDiff = (
  scenegraph: Scenegraph,
  id1: string,
  id2: string
): { translate: { x?: number; y?: number } } => {
  const [id1Suffix, id2Suffix] = getLCAChainSuffixes(scenegraph, id1, id2);
  // accumulate transforms from id1 to id2
  let transform: {
    translate: { x?: number; y?: number };
  } = {
    translate: {
      x: 0,
      y: 0,
    },
  };

  // first go up the id2 chain
  for (const node of id2Suffix) {
    const xUndefined =
      scenegraph[node].transform.translate.x === undefined ||
      transform.translate.x === undefined;
    const yUndefined =
      scenegraph[node].transform.translate.y === undefined ||
      transform.translate.y === undefined;
    transform = {
      translate: {
        x: !xUndefined
          ? scenegraph[node].transform.translate.x! + transform.translate.x!
          : undefined,
        y: !yUndefined
          ? scenegraph[node].transform.translate.y! + transform.translate.y!
          : undefined,
      },
    };
  }

  // then go down the id1 chain
  for (const node of id1Suffix) {
    const xUndefined =
      scenegraph[node].transform.translate.x === undefined ||
      transform.translate.x === undefined;
    const yUndefined =
      scenegraph[node].transform.translate.y === undefined ||
      transform.translate.y === undefined;
    transform = {
      translate: {
        x: !xUndefined
          ? transform.translate.x! - scenegraph[node].transform.translate.x!
          : undefined,
        y: !yUndefined
          ? transform.translate.y! - scenegraph[node].transform.translate.y!
          : undefined,
      },
    };
  }

  return transform;
};
