import { onCleanup, useContext } from "solid-js";
import type { JSX } from "solid-js";
import { Id, UNSAFE_useScenegraph, ScenegraphElement } from "./scenegraph";
import withBluefish from "./withBluefish";
import { Name, Scope, ScopeContext } from "./createName";
import { useError } from "./errorContext";
import { produce } from "solid-js/store";

export type Selection = Id | [Id, ...Name[]];
export type NormalizedSelection = [Id, ...Name[]];

export type RefProps = {
  name: Id;
  select: Selection;
};

export const normalizeSelection = (select: Selection): NormalizedSelection => {
  if (Array.isArray(select)) {
    return select;
  } else {
    return [select];
  }
};

// TODO: probably scopeIds and layoutIds should have different types...
export const resolveSelection = (
  scope: Scope,
  select: NormalizedSelection
): Id => {
  const [id, ...names] = select;

  let currId = id;

  if (!(id in scope)) {
    throw new Error(
      `Could not find ${id}. Available names: ${Object.keys(scope).join(", ")}`
    );
  }

  for (const name of names) {
    const child = scope[currId].children[name];
    if (child === undefined) {
      console.log(JSON.parse(JSON.stringify(scope)));
      throw new Error(
        `Could not find ${name} in ${currId}. Available names: ${Object.keys(
          scope[currId].children
        ).join(", ")}`
      );
    }
    currId = child;
  }

  const layoutId = scope[currId].layoutNode;

  if (layoutId === undefined) {
    console.log(JSON.parse(JSON.stringify(scope)));
    throw new Error(
      `Could not find layout node for ${currId}. Available names: ${Object.keys(
        scope[currId].children
      ).join(", ")}`
    );
  }

  return layoutId;
};

export const Ref = withBluefish(
  (props: RefProps) => {
    const error = useError();
    const [scope, setScope] = useContext(ScopeContext);
    const { createRef } = UNSAFE_useScenegraph();

    const normalizedSelection = () => normalizeSelection(props.select);

    onCleanup(() => {
      // when the Ref node is destroyed, we need to clear any relevant scopes
      setScope(
        produce((scope) => {
          // filter out scopes that have this id as their layoutNode
          for (const key of Object.keys(scope) as Array<Id>) {
            if (scope[key].layoutNode === props.name) {
              delete scope[key];
            }
          }
        })
      );
    });

    // return <></>;
    return {
      jsx: <></>,
      layout: (parentId: Id | null) => {
        if (parentId === null) {
          throw new Error("Ref must be a child of a Layout");
        }

        createRef(
          props.name,
          resolveSelection(scope, normalizedSelection()),
          parentId
        );
      },
    } satisfies ScenegraphElement as unknown as JSX.Element;
  },
  { displayName: "Ref" }
);

export default Ref;
