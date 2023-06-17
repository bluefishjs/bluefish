import { BBoxContext, ParentIDContext, Id } from "./scenegraph";
import { Component, useContext } from "solid-js";

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

export const Ref: Component<RefProps> = (props) => {
  const { id, refId } = props;

  const [scenegraph, { createRef }] = useContext(BBoxContext)!;

  const parentId = useContext(ParentIDContext);

  createRef(id, refId, parentId);

  return <></>;
};

export default Ref;
