import Group from "../../src/group";
import Text from "../../src/text";
import { Id } from "../../src/scenegraph";
import Distribute from "../../src/distribute";
import Ref from "../../src/ref";
import Align from "../../src/align";
import { For, createUniqueId } from "solid-js";
import ElmTuple from "./elm-tuple";
import withBluefish from "../../src/withBluefish";
import { Value } from "./types";
import { createName } from "../createName";
import { StackH } from "../stackh";
import { StackV } from "../stackv";

export type ObjectProps = {
  name: Id;
  objectType: string;
  objectValues: {
    type: string;
    value: Value;
  }[];
};

export const HeapObject = withBluefish((props: ObjectProps) => {
  const fontFamily = "verdana, arial, helvetica, sans-serif";

  const objectTypeName = createName("objectType");
  const objectRefName = createName("objectRef");

  const elmNames = props.objectValues.map((_, i) => createName(`elm-${i}`));

  return (
    <StackV alignment="left" spacing={10}>
      <Text
        name={objectTypeName}
        font-family={fontFamily}
        font-size={"16px"}
        fill={"grey"}
      >
        {props.objectType}
      </Text>
      <StackH name={objectRefName} spacing={0}>
        <For each={props.objectValues}>
          {(elementData, index) => (
            <ElmTuple
              name={elmNames[index()]}
              tupleIndex={`${index()}`}
              tupleData={elementData}
            />
          )}
        </For>
      </StackH>
    </StackV>
  );
});

export default HeapObject;
