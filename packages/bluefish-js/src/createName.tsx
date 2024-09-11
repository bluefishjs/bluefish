import { Accessor, createContext, createUniqueId, useContext } from "solid-js";
import { SetStoreFunction, Store } from "solid-js/store";
import { Id } from "./scenegraph";

export type Name = string;

/* 
TODO: This is wrong!!!
A name should either point to an id of another name or else point to an id of a layout node.

draw this out. it's too hard to see
*/

export type Scope = {
  [key: Id]: {
    layoutNode: Id | undefined;
    parent: Id; // TODO: not sure if this is used. might be useful for debugging/error reporting, though
    children: { [key: Name]: Id };
  };
};

// the scope context is a map from uid to a set of names that map to other uids
export const ScopeContext = createContext<
  [get: Store<Scope>, set: SetStoreFunction<Scope>]
>([{}, () => {}]);
export const ParentScopeIdContext = createContext<Accessor<Name>>(() => "");

export const createName = (name: string) => {
  const genId = `${name}(${createUniqueId()})`;

  const [scope, setScope] = useContext(ScopeContext);
  const parentId = useContext(ParentScopeIdContext);

  // TODO: check if it exists before adding

  // setScope(name, genId);
  setScope(genId, {
    parent: parentId(),
    layoutNode: undefined,
    children: {},
  }); // inside withBluefish, we first check if we have a props.name as input, which will then become the parent context. otherwise we'll generate a new id for the parent context
  setScope(parentId(), "children", name, genId);

  return genId;
};

export const resolveName = (
  layoutNode: Id,
  options?: { default?: boolean }
): Name | undefined => {
  options = {
    default: true,
    ...options,
  };
  const [scope] = useContext(ScopeContext);
  const name = Object.keys(scope).find(
    (name) => scope[name].layoutNode === layoutNode
  );

  return name ?? (options?.default ? layoutNode : undefined);
};
