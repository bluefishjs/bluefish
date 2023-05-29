import React, {
  useEffect,
  useContext,
  PropsWithChildren,
  useMemo,
  useState,
} from 'react';
import {
  BBox,
  BBoxContext,
  Id,
  ParentIDContext,
  Transform,
} from '../scenegraph';
import { createEffect, withSolid } from '../reactSolidState';

export type LayoutProps = PropsWithChildren<{
  id: Id;
  bbox?: Partial<BBox>;
  layout: (childIds: Id[]) => {
    bbox: Partial<BBox>;
    transform: Transform;
  };
  paint: (props: {
    bbox: BBox;
    transform: Transform;
    children: React.ReactNode;
  }) => JSX.Element;
}>;

export const Layout: React.FC<LayoutProps> = withSolid((props) => {
  const [isFirstRender, setIsFirstRender] = useState(true);

  const { id, layout, paint, children } = props;

  const parentId = useContext(ParentIDContext);

  const [scenegraph, { setBBox, createNode }] = useContext(BBoxContext)!;

  const childIds = useMemo(
    () =>
      React.Children.map(
        children,
        (child) => (child as React.ReactElement<any>).props.id
      ) ?? [],
    [children]
  );

  if (scenegraph[id] === undefined) {
    createNode(id, parentId);
  }

  useEffect(() => {
    // TODO: this is a hack b/c otherwise layout doesn't work on first render
    if (isFirstRender) {
      setIsFirstRender(false);
    }

    const { bbox, transform } = layout(childIds);
    setBBox(id, bbox, id, transform);

    // TODO: probably have to cleanup ownership here...
  }, [
    layout,
    id,
    scenegraph,
    setBBox,
    createNode,
    childIds,
    parentId,
    isFirstRender,
  ]);

  const Paint = paint;

  const currentBbox = () =>
    // NOTE: this is safe b/c Layout only creates normal nodes, not refs
    scenegraph[id]?.bbox ?? {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };

  const currentTransform = () => {
    return scenegraph[id]?.transform ?? { translate: { x: 0, y: 0 } };
  };

  return function LayoutWrapper() {
    return (
      <ParentIDContext.Provider value={id}>
        <Paint bbox={currentBbox()} transform={currentTransform()}>
          {children}
        </Paint>
      </ParentIDContext.Provider>
    );
  };
});

export default Layout;
