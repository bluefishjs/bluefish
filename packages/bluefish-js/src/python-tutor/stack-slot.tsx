import Group from "../../src/group";
import Rect from "../../src/rect";
import Align from "../../src/align";
import Distribute from "../../src/distribute";
import Ref from "../../src/ref";
import Text from "../../src/text";
import { createUniqueId } from "solid-js";
import { Id } from "../../src/scenegraph";
import { Pointer } from "./types";
import withBluefish from "../withBluefish";
import { createName } from "../createName";

export type StackSlotProps = {
  name?: Id;
  variable: string;
  value: string | Pointer;
};

export const StackSlot = withBluefish((props: StackSlotProps) => {
  const fontFamily = "verdana, arial, helvetica, sans-serif";

  const boxName = createName("box");
  const nameName = createName("name");
  const valueName = createName("value");

  return (
    <Group>
      <Rect name={boxName} y={0} height={40} width={40} fill={"#e2ebf6"} />
      <Text name={nameName} font-size={"24px"} font-family={fontFamily}>
        {props.variable}
      </Text>
      {/* TODO: if we only align or distribute on a single dimension, then their bounding boxes should be null or something along the unconstrained dimension... */}
      <Align alignment="centerY">
        <Ref select={nameName} />
        <Ref select={boxName} />
      </Align>
      <Distribute direction="horizontal" spacing={5}>
        <Ref select={nameName} />
        <Ref select={boxName} />
      </Distribute>
      <Align alignment="bottomCenter">
        <Rect height={2} width={40} fill={"#a6b3b6"} />
        <Ref select={boxName} />
      </Align>
      <Align alignment="centerLeft">
        <Rect height={40} width={2} fill={"#a6b3b6"} />
        <Ref select={boxName} />
      </Align>

      {typeof props.value === "string" ? (
        <Align alignment="center">
          <Text name={valueName} font-size="24px" font-family={fontFamily}>
            {props.value}
          </Text>
          <Ref select={boxName} />
        </Align>
      ) : (
        <Align alignment="center">
          <Text name={valueName} font-size="24px" font-family={fontFamily}>
            {""}
          </Text>
          <Ref select={boxName} />
        </Align>
      )}
    </Group>
  );
});
