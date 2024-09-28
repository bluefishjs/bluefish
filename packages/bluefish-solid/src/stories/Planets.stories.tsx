import type { Meta, StoryObj } from "storybook-solidjs";
import Align from "../align";
import Arrow from "../arrow";
import Background from "../background";
import Bluefish from "../bluefish";
import Circle from "../circle";
import Distribute from "../distribute";
import Group from "../group";
import Ref from "../ref";
import Text from "../text";
import { StackH } from "../stackh";
import { StackV } from "../stackv";
import Rect from "../rect";

const meta: Meta = {
  title: "Example/Planets",
};

export default meta;
type Story = StoryObj;

export const PlanetsAlignDistribute: Story = {
  render: () => {
    return (
      <Bluefish id="bluefish-planets" padding={20}>
        <Circle name="mercury" r={15} fill={"#EBE3CF"} stroke-width={3} stroke={"black"} />
        <Circle name="venus" r={36} fill={"#DC933C"} stroke-width={3} stroke={"black"} />
        <Circle name="earth" r={38} fill={"#179DD7"} stroke-width={3} stroke={"black"} />
        <Circle name="mars" r={21} fill={"#F1CF8E"} stroke-width={3} stroke={"black"} />
        <Align alignment="centerY">
          <Ref select="mercury" />
          <Ref select="venus" />
          <Ref select="earth" />
          <Ref select="mars" />
        </Align>
        <Distribute direction="horizontal" spacing={50}>
          <Ref select="mercury" />
          <Ref select="venus" />
          <Ref select="earth" />
          <Ref select="mars" />
        </Distribute>
        <Text name="label" vertical-anchor="start" width={500}>
          Mercury
        </Text>
        <Align alignment="centerX">
          <Ref select="label" />
          <Ref select="mercury" />
        </Align>
        <Distribute direction="vertical" spacing={60}>
          <Ref select="label" />
          <Ref select="mercury" />
        </Distribute>
        <Background name="background">
          <Ref select="mercury" />
          <Ref select="venus" />
          <Ref select="earth" />
          <Ref select="mars" />
        </Background>
        <Arrow name="arrow">
          <Ref select="label" />
          <Ref select="mercury" />
        </Arrow>
      </Bluefish>
    );
  },
};

export const PlanetsRowCol: Story = {
  render: () => {
    return (
      <Bluefish id="bluefish-planets" padding={20}>
        <StackH spacing={50}>
          <Circle name="mercury" r={15} fill={"#EBE3CF"} stroke-width={3} stroke={"black"} />
          <Circle name="venus" r={36} fill={"#DC933C"} stroke-width={3} stroke={"black"} />
          <Circle name="earth" r={38} fill={"#179DD7"} stroke-width={3} stroke={"black"} />
          <Circle name="mars" r={21} fill={"#F1CF8E"} stroke-width={3} stroke={"black"} />
        </StackH>
        <StackV spacing={60}>
          <Text name="label" vertical-anchor="start" width={500}>
            Mercury
          </Text>
          <Ref select="mercury" />
        </StackV>
        <Background>
          <Ref select="mercury" />
          <Ref select="venus" />
          <Ref select="earth" />
          <Ref select="mars" />
        </Background>
        <Arrow>
          <Ref select="label" />
          <Ref select="mercury" />
        </Arrow>
      </Bluefish>
    );
  },
};

export const PlanetsTutorial: Story = {
  render: () => {
    return (
      <Bluefish padding={20}>
        <Background name="planets" padding={10}>
          <StackH spacing={50}>
            <Circle name="mercury" r={15} fill={"#EBE3CF"} stroke-width={3} stroke={"black"} />
            <Circle name="venus" r={36} fill={"#DC933C"} stroke-width={3} stroke={"black"} />
            <Circle name="earth" r={38} fill={"#179DD7"} stroke-width={3} stroke={"black"} />
            <Circle name="mars" r={21} fill={"#F1CF8E"} stroke-width={3} stroke={"black"} />
          </StackH>
        </Background>
        <Align alignment="centerX">
          <Text name="label">Mercury</Text>
          <Ref select="mercury" />
        </Align>
        <Distribute direction="vertical" spacing={20}>
          <Ref select="label" />
          <Ref select="planets" />
        </Distribute>
        <Arrow>
          <Ref select="label" />
          <Ref select="mercury" />
        </Arrow>
      </Bluefish>
    );
  },
};

export const PlanetsRels: Story = {
  render: () => {
    return (
      <Bluefish padding={20}>
        <Group
          rels={() => (
            <>
              <Align alignment="centerX">
                <Ref select="label" />
                <Ref select="mercury" />
              </Align>
              <Distribute direction="vertical" spacing={20}>
                <Ref select="label" />
                <Ref select="planets" />
              </Distribute>
              <Arrow>
                <Ref select="label" />
                <Ref select="mercury" />
              </Arrow>
            </>
          )}
        >
          <Background name="planets" padding={10}>
            <StackH spacing={50}>
              <Circle name="mercury" r={15} fill={"#EBE3CF"} stroke-width={3} stroke={"black"} />
              <Circle name="venus" r={36} fill={"#DC933C"} stroke-width={3} stroke={"black"} />
              <Circle name="earth" r={38} fill={"#179DD7"} stroke-width={3} stroke={"black"} />
              <Circle name="mars" r={21} fill={"#F1CF8E"} stroke-width={3} stroke={"black"} />
            </StackH>
          </Background>
          <Text name="label">Mercury</Text>
        </Group>
      </Bluefish>
    );
  },
};
