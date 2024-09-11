import { ParentProps } from "solid-js";
import Background from "../background";
import Bluefish from "../bluefish";
import { createName } from "../createName";
import Distribute from "../distribute";
import { StackV } from "../stackv";
import withBluefish from "../withBluefish";
import { Align } from "../align";
import { Group } from "../group";
import { Rect } from "../rect";
import { Ref } from "../ref";
import { Id } from "../scenegraph";
import { Text } from "../text";
import { Selection } from "../ref";
import { LayoutFunction } from "./layoutfunction";

const Pad = withBluefish(
  (
    props: ParentProps<{
      name?: Id;
      padding: number;
      fill?: string;
    }>
  ) => (
    <Background
      padding={props.padding}
      background={() => <Rect fill={props.fill || "transparent"} />}
    >
      {props.children}
    </Background>
  )
);

const CellBorder = withBluefish(
  (props: {
    name?: Id;
    strokeWidth?: number;
    horizontal: Selection;
    vertical: Selection;
  }) => {
    const rect = createName("rect");
    return (
      <Group>
        <Rect
          name={rect}
          fill="transparent"
          stroke="#40A03F"
          stroke-width={props.strokeWidth || 1}
        />
        <LayoutFunction
          f={({ left, width, right }) => ({ left, width, right })}
        >
          <Ref select={props.horizontal} />
          <Ref select={rect} />
        </LayoutFunction>
        <LayoutFunction
          f={({ top, height, bottom }) => ({ top, height, bottom })}
        >
          <Ref select={props.vertical} />
          <Ref select={rect} />
        </LayoutFunction>
      </Group>
    );
  }
);

export const Brownies = () => {
  return (
    <Bluefish>
      <Background
        padding={100}
        background={() => <Rect fill="#7CD4AC" opacity={0.3} />}
        x={0}
        y={0}
      >
        <Background
          padding={0}
          name="recipeTable"
          background={() => (
            <Rect stroke="#40A03F" fill="#FFFFFF" stroke-width={3} />
          )}
        >
          <Pad padding={10} name="title">
            <Text>
              Preheat oven to 325°F (160°C) and butter a 9x13-in. baking pan
            </Text>
          </Pad>
          <Pad padding={10} name="col0-row0">
            <Text>6 oz. (170 g) 70% cacao chocolate</Text>
          </Pad>
          <Pad padding={10} name="col0-row1">
            <Text>6 oz. (170 g) butter</Text>
          </Pad>
          <Pad padding={10} name="col0-row2">
            <Text>1-1/2 cup (300 g) granulated sugar </Text>
          </Pad>
          <Pad padding={10} name="col0-row3">
            <StackV>
              <Text>3 large eggs</Text>
            </StackV>
          </Pad>
          <Pad padding={10} name="col0-row4">
            <Text>1 tsp. (5 mL) vanilla extract</Text>
          </Pad>
          <Pad padding={10} name="col0-row5">
            <Text>1 cup (125 g) all-purpose flour</Text>
          </Pad>
          <Pad padding={10} name="col1-row0_1">
            <Text>melt in double boiler</Text>
          </Pad>
          <Pad padding={10} name="col1_2-row0_2">
            <Text>stir in</Text>
          </Pad>
          <Pad padding={10} name="col1_2-row3_4">
            <Text>lightly beat</Text>
          </Pad>
          <Pad padding={10} name="col3-row0_5">
            <Text>stir in</Text>
          </Pad>
          <Pad padding={10} name="col4-row0_5">
            <Text>stir in</Text>
          </Pad>
          <Pad padding={10} name="col5-row0_5">
            <Text>bake 325°F (160°C) for 35 min.</Text>
          </Pad>
          <StackV alignment="left" spacing={0}>
            <Ref select="title" />
            <Ref select="col0-row0" />
            <Ref select="col0-row1" />
            <Ref select="col0-row2" />
            <Ref select="col0-row3" />
            <Ref select="col0-row4" />
            <Ref select="col0-row5" />
          </StackV>
          <Group name="col0">
            <Ref select="col0-row0" />
            <Ref select="col0-row1" />
            <Ref select="col0-row2" />
            <Ref select="col0-row3" />
            <Ref select="col0-row4" />
            <Ref select="col0-row5" />
          </Group>
          <Distribute direction="horizontal" spacing={0}>
            <Ref select="col0" />
            <Ref select="col1-row0_1" />
          </Distribute>
          <Align alignment="centerY">
            <Group>
              <Ref select="col0-row0" />
              <Ref select="col0-row1" />
            </Group>
            <Ref select="col1-row0_1" />
          </Align>
          <Distribute direction="horizontal" spacing={0}>
            <Ref select="col1-row0_1" />
            <Ref select="col1_2-row0_2" />
          </Distribute>
          <Align alignment="centerY">
            <Group>
              <Ref select="col0-row0" />
              <Ref select="col0-row1" />
              <Ref select="col0-row2" />
            </Group>
            <Ref select="col1_2-row0_2" />
          </Align>
          <Align alignment="centerY">
            <Group>
              <Ref select="col0-row3" />
              <Ref select="col0-row4" />
            </Group>
            <Ref select="col1_2-row3_4" />
          </Align>
          <Align alignment="left">
            <Group>
              <Ref select="col1-row0_1" />
              <Ref select="col1_2-row0_2" />
            </Group>
            <Ref select="col1_2-row3_4" />
          </Align>
          <Distribute direction="horizontal" spacing={0}>
            <Group>
              <Ref select="col1-row0_1" />
              <Ref select="col1_2-row0_2" />
              <Ref select="col1_2-row3_4" />
            </Group>
            <Ref select="col3-row0_5" />
          </Distribute>
          <Align alignment="centerY">
            <Group>
              <Ref select="col0-row0" />
              <Ref select="col0-row4" />
            </Group>
            <Ref select="col3-row0_5" />
          </Align>
          <Distribute direction="horizontal" spacing={0}>
            <Group>
              <Ref select="col3-row0_5" />
            </Group>
            <Ref select="col4-row0_5" />
          </Distribute>
          <Align alignment="centerY">
            <Group>
              <Ref select="col0-row0" />
              <Ref select="col0-row5" />
            </Group>
            <Ref select="col4-row0_5" />
          </Align>
          <Distribute direction="horizontal" spacing={0}>
            <Group>
              <Ref select="col4-row0_5" />
            </Group>
            <Ref select="col5-row0_5" />
          </Distribute>
          <Align alignment="centerY">
            <Group>
              <Ref select="col0-row0" />
              <Ref select="col0-row5" />
            </Group>
            <Ref select="col5-row0_5" />
          </Align>

          <CellBorder horizontal="col0" vertical="col0-row0" />
          <CellBorder horizontal="col0" vertical="col0-row1" />
          <CellBorder horizontal="col0" vertical="col0-row2" />
          <CellBorder horizontal="col0" vertical="col0-row3" />
          <CellBorder horizontal="col0" vertical="col0-row4" />
          <CellBorder horizontal="col0" vertical="col0-row5" />

          <Group name="col1_2">
            <Ref select="col1-row0_1" />
            <Ref select="col1_2-row0_2" />
            <Ref select="col1_2-row3_4" />
          </Group>
          <Group name="col1_3">
            <Ref select="col1_2" />
            <Ref select="col3-row0_5" />
          </Group>
          <Group name="row0_1">
            <Ref select="col0-row0" />
            <Ref select="col0-row1" />
          </Group>
          <Group name="row0_2">
            <Ref select="col0-row0" />
            <Ref select="col0-row2" />
          </Group>
          <Group name="row3_4">
            <Ref select="col0-row3" />
            <Ref select="col0-row4" />
          </Group>
          <Group name="row0_5">
            <Ref select="col0-row0" />
            <Ref select="col0-row5" />
          </Group>
          <Group name="row0_4">
            <Ref select="col0-row0" />
            <Ref select="col0-row4" />
          </Group>
          <CellBorder horizontal="col1-row0_1" vertical="row0_1" />
          <CellBorder horizontal="col1_2" vertical="row0_2" />
          <CellBorder horizontal="col1_2" vertical="row3_4" />
          <CellBorder horizontal="col1_3" vertical="row0_4" />
          <CellBorder horizontal="col5-row0_5" vertical="row0_5" />

          <Group name="col0_5">
            <Ref select="col0-row0" />
            <Ref select="col5-row0_5" />
          </Group>

          <CellBorder horizontal="col0_5" vertical="title" />
        </Background>
      </Background>

      <Text name="recipeName">Dark Chocolate Brownies (makes 24 squares)</Text>

      <StackV spacing={10} alignment="left">
        <Ref select="recipeName" />
        <Ref select="recipeTable" />
      </StackV>
    </Bluefish>
  );
};
