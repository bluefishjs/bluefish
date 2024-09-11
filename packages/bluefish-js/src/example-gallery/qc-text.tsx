import { Path } from "./path.js";
import { Line } from "../line.jsx";
import Background from "../background.jsx";
import Bluefish from "../bluefish.jsx";
import Circle from "../circle.jsx";
import Group from "../group.jsx";
import Rect from "../rect.jsx";
import Ref from "../ref.jsx";
import { StackH } from "../stackh.jsx";
import { StackV } from "../stackv.jsx";
import withBluefish from "../withBluefish.jsx";
import Align from "../align.jsx";
import Text from "../text.jsx";

const Wire = withBluefish((props) => (
  <Align alignment="centerLeft">
    <Rect height={3} width={(props.depth ?? 1) * 60 + 30} fill="black"></Rect>
    <StackH>
      <Rect fill="transparent" width={10}></Rect>
      {props.children}
    </StackH>
  </Align>
));

const WireSymbol = withBluefish((props) => (
  <Align alignment="center">
    <Rect height={50} width={50} fill="transparent"></Rect>
    {props.children}
  </Align>
));

const EmptySpot = withBluefish(() => <WireSymbol></WireSymbol>);

const BoxedSymbol = withBluefish((props) => {
  return (
    <Background
      background={() => (
        <Rect
          height={50}
          width={50}
          fill="white"
          stroke="black"
          stroke-width={3}
        ></Rect>
      )}
    >
      <Text
        font-family="serif"
        x={0}
        y={0}
        fill="black"
        font-size="30"
        dy="5"
        font-style="italic"
      >
        {props.children}
      </Text>
    </Background>
  );
});

const OPlus = withBluefish(() => (
  <Group>
    <Align alignment="center">
      <Circle
        r={15}
        fill="transparent"
        stroke="black"
        stroke-width={3}
      ></Circle>
      <Rect height={3} width={30} fill="black"></Rect>
      <Rect height={30} width={3} fill="black"></Rect>
    </Align>
  </Group>
));

const ControlDot = withBluefish(() => <Circle r={5} fill="black"></Circle>);

export const QCText = () => {
  return (
    <Bluefish>
      <StackH alignment="centerY" spacing={25}>
        <StackV>
          <Wire>
            <WireSymbol>
              <ControlDot name="c1"></ControlDot>
            </WireSymbol>
          </Wire>
          <Wire>
            <BoxedSymbol name="z">Z</BoxedSymbol>
          </Wire>
        </StackV>
        <Text font-size="40" font-weight={300}>
          ≡
        </Text>
        <StackV>
          <Wire depth={3}>
            <EmptySpot></EmptySpot>
            <WireSymbol>
              <ControlDot name="c2"></ControlDot>
            </WireSymbol>
          </Wire>
          <Wire depth={3}>
            <BoxedSymbol>H</BoxedSymbol>
            <WireSymbol>
              <OPlus name="+"></OPlus>
            </WireSymbol>
            <BoxedSymbol>H</BoxedSymbol>
          </Wire>
        </StackV>
        <Text name="+description">This is a controlled-NOT.</Text>
      </StackH>
      <Line>
        <Ref select="c1" />
        <Ref select="z" />
      </Line>
      <Line>
        <Ref select="c2" />
        <Ref select="+" />
      </Line>
      <Background
        background={() => <Rect fill="rgba(255,200,0,0.333)" rx="10" />}
      >
        <Ref select="+" />
      </Background>
      <Background
        background={() => <Rect fill="rgba(255,200,0,0.333)" rx="10" />}
      >
        <Ref select="+description" />
      </Background>
    </Bluefish>
  );
};
