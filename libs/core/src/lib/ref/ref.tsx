import { useContext, useEffect } from 'react';
import { BBoxContext, ParentIDContext, Id } from '../scenegraph';
import { withSolid } from '../reactSolidState';

// The properties we want:
// every time the refId's bbox is updated, it should be propagated to the id
//   (passing through worldTransforms)
// every time the id's bbox is updated, it should be propagated to the refId
//   (passing through worldTransforms)
// I guess owners are the same for both?

// TODO: actually the Ref's bbox should be completely derived from the refId's bbox that way we
// avoid cycles. whenever the Ref's bbox is requested, we'll compute it. whenever the Ref's bbox is
// "modified," we'll instead modify the refId's bbox.

export type RefProps = {
  id: Id;
  refId: Id;
};

export const Ref: React.FC<RefProps> = withSolid((props) => {
  const { id, refId } = props;

  const [scenegraph, { createRef, createNode, getCurrentBBox, setBBox }] =
    useContext(BBoxContext)!;

  const parentId = useContext(ParentIDContext);

  if (scenegraph[id] === undefined) {
    createRef(id, refId, parentId);
    // createNode(id, parentId);
  }

  // useEffect(() => {
  //   // first we convert the refBBox to our frame
  //   // const refBBox = getCurrentBBox(scenegraph, refId);
  //   // const refTransform = scenegraph[refId]?.worldTransform;
  //   // setBBox(id, refBBox, id, refTransform);
  //   // TODO: probably have to cleanup ownership here...
  // }, [createRef, getCurrentBBox, id, refId, scenegraph, setBBox]);

  // eslint-disable-next-line react/display-name
  return () => <></>;
});

export default Ref;
