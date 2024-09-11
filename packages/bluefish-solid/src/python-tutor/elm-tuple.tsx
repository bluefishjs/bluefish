import { createUniqueId } from "solid-js";
import { Align } from "../align";
import { Group } from "../group";
import { Rect } from "../rect";
import { Ref } from "../ref";
import { Id } from "../scenegraph";
import { Text } from "../text";
import { Value } from "./types";
import { createName } from "../createName";
import withBluefish from "../withBluefish";

export type ElmTupleProps = {
  name?: Id;
  tupleIndex: string;
  tupleData: { type: string; value: Value };
};

export const ElmTuple = withBluefish((props: ElmTupleProps) => {
  const fontFamily = "verdana, arial, helvetica, sans-serif";

  const boxName = createName("box");
  const labelName = createName("label");
  const valName = createName("val");

  return (
    <Group>
      <Rect
        name={boxName}
        height={60}
        width={70}
        fill={"#ffffc6"}
        stroke={"grey"}
      />
      <Text
        name={labelName}
        font-family={fontFamily}
        font-size={"16px"}
        fill={"gray"}
      >
        {props.tupleIndex}
      </Text>
      {props.tupleData.type === "string" ? (
        <Text
          name={valName}
          font-size={"24px"}
          font-family={fontFamily}
          fill={"black"}
        >
          {props.tupleData.value as string}
        </Text>
      ) : (
        <Text name={valName} fill={"none"}>
          {""}
        </Text>
      )}
      <Align alignment="center">
        <Ref select={valName} />
        <Ref select={boxName} />
      </Align>
      <Align alignment="topLeft">
        <Ref select={labelName} />
        <Ref select={boxName} />
      </Align>
    </Group>
  );
});

export default ElmTuple;
