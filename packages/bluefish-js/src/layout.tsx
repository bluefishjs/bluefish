import { Dynamic } from "solid-js/web";
import {
  For,
  JSX,
  ParentProps,
  createRenderEffect,
  createSignal,
  on,
  onCleanup,
  useContext,
} from "solid-js";
import {
  BBox,
  Transform,
  UNSAFE_useScenegraph,
  LayoutFn,
  Id,
  ScenegraphElement,
  resolveScenegraphElements,
  UNSAFE_asNode,
} from "./scenegraph";
import { IdContext } from "./withBluefish";
import { ScopeContext } from "./createName";
import { useError } from "./errorContext";
import { LayoutUIDContext } from "./bluefish";
import { createStore, produce } from "solid-js/store";

export type LayoutProps = ParentProps<{
  name: Id;
  bbox?: BBox;
  layout: LayoutFn;
  paint: (props: {
    bbox: BBox;
    transform: Transform;
    children: JSX.Element;
    customData?: any;
  }) => JSX.Element;
}>;

export const Layout = (props: LayoutProps) => {
  const [_scope, setScope] = useContext(ScopeContext);
  const error = useError();
  const layoutUID = useContext(LayoutUIDContext);
  const [childLayouts, setChildLayouts] = createSignal<
    ((parentId: Id | null) => void)[]
  >([]);

  const [scenegraphInfo, setScenegraphInfo] = createStore({
    bbox: {},
    transform: { translate: {} },
    customData: {},
  });

  const { scenegraph, createNode, mergeBBoxAndTransform, createChildRepr } =
    UNSAFE_useScenegraph();

  // evaluate the child props before running the effect so that children's layout functions are
  // called before the parent's layout function
  // h/t Erik Demaine
  const jsx = (
    <IdContext.Provider value={() => undefined}>
      {(() => {
        const childNodes = resolveScenegraphElements(props.children);

        setChildLayouts(() => {
          return childNodes.map((child) => {
            return child.layout;
          });
        });

        return (
          <Dynamic component={props.paint} {...scenegraphInfo}>
            <For each={childNodes}>{(child) => child.jsx}</For>
          </Dynamic>
        );
      })()}
    </IdContext.Provider>
  );

  onCleanup(() => {
    // when the Layout node is destroyed, we need to clear any relevant scopes
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

  createRenderEffect(
    on(
      () => layoutUID(),
      () => {
        const node = UNSAFE_asNode(
          scenegraph[props.name] ?? {
            type: "node",
            bbox: {},
            transform: { translate: {} },
            children: [],
            customData: {},
          }
        );
        setScenegraphInfo({
          bbox: node.bbox ?? {},
          transform: {
            translate: {
              x: node.transform?.translate?.x ?? 0,
              y: node.transform?.translate?.y ?? 0,
            },
          },
          customData: node.customData,
        });
      }
    )
  );

  const layout = (parentId: Id | null) => {
    createNode(props.name, parentId);

    for (const childLayout of childLayouts()) {
      childLayout(props.name);
    }

    const node = UNSAFE_asNode(scenegraph[props.name]);

    const { bbox, transform, customData } = props.layout(
      (node.children ?? []).map((childId: Id) =>
        createChildRepr(props.name, childId)
      )
    );

    mergeBBoxAndTransform(props.name, props.name, bbox, transform);
    node.customData = customData;
  };

  return {
    jsx,
    layout,
  } satisfies ScenegraphElement as unknown as JSX.Element;
};

export default Layout;
