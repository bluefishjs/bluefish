export type Tree = { [key: string]: { parent: string | null } };

export const getAncestorChain = (scenegraph: Tree, id: string): string[] => {
  const chain = [];
  let node = scenegraph[id];
  if (node === undefined) {
    throw new Error(`node ${id} doesn't exist`);
  }
  while (node.parent !== null) {
    chain.push(node.parent);
    node = scenegraph[node.parent];
  }
  return chain.reverse();
};

export const getLCAChain = (
  scenegraph: Tree,
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
  scenegraph: Tree,
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
