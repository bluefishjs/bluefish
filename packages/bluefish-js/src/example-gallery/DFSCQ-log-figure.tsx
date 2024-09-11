import { Path } from "./path";
import { Line } from "../line";
import { For } from "solid-js";
import Arrow from "../arrow";
import Background from "../background";
import Bluefish from "../bluefish";
import { createName } from "../createName";
import Distribute from "../distribute";
import Group from "../group";
import Rect from "../rect";
import Ref from "../ref";
import { StackH } from "../stackh";
import { StackV } from "../stackv";
import Text from "../text";
import Align from "../align";
import withBluefish from "../withBluefish";
import LayoutFunction from "./layoutfunction";

const BoxedAlign = withBluefish((props) => (
  <Align alignment={props.alignment}>
    <Rect
      height={props.height ?? 0}
      width={props.width ?? 0}
      fill="transparent"
    ></Rect>
    {props.children}
  </Align>
));

const Block = withBluefish((props) => (
  <Rect
    height={40}
    width={props.width ?? 18}
    stroke="black"
    stroke-width={3}
    fill={props.color}
  />
));

const Blocks = withBluefish((props) => (
  <StackH spacing={0}>
    <For each={props.colors}>
      {(color) => <Block color={color} width={props.width} />}
    </For>
  </StackH>
));

const BigLeftBracket = withBluefish((props) => (
  <StackV spacing={0} alignment="left">
    <Rect height={3} width={15}></Rect>
    <Rect height={70} width={3}></Rect>
    <Rect height={3} width={15}></Rect>
  </StackV>
));
const BigRightBracket = withBluefish((props) => (
  <StackV spacing={0} alignment="right">
    <Rect height={3} width={15}></Rect>
    <Rect height={70} width={3}></Rect>
    <Rect height={3} width={15}></Rect>
  </StackV>
));
const BigComma = withBluefish(() => (
  <Text font-family="monospace" font-size="30" y={10}>
    ,
  </Text>
));

// deprecated and unused. Needed to have names
// on the left and right brackets.
const BigArray = withBluefish((props) => (
  <StackH spacing={20}>
    <BigLeftBracket name="bigleftbracket" />
    <For each={props.entries}>
      {(entry) => (
        <StackH spacing={0}>
          {entry()}
          <BigComma />
        </StackH>
      )}
    </For>
    <BigRightBracket />
  </StackH>
));

const TitledBackground = withBluefish((props) => (
  <Align alignment="topLeft">
    <Text font-family="serif" font-weight={300} font-size="20" x={10} y={4}>
      {props.title}
    </Text>
    <Background padding={30}>
      <Align alignment="centerLeft">
        <Rect height={0} width={680} fill="transparent"></Rect>
        {props.children}
      </Align>
    </Background>
  </Align>
));

const DashedFunnel = withBluefish((props) => {
  const bottomTick1 = createName("bottomTick1");
  const bottomTick2 = createName("bottomTick2");
  const topTick1 = createName("topTick1");
  const topTick2 = createName("topTick2");
  return (
    <Group>
      <StackV spacing={6} alignment="left">
        <Ref select={props.selectTopLeft} />
        <Path name={topTick1} d="M 0 0 L 0 20" stroke-dasharray="5" />
      </StackV>
      <StackV spacing={5} alignment="right">
        <Ref select={props.selectTopRight} />
        <Path name={topTick2} d="M 0 0 L 0 20" stroke-dasharray="5" />
      </StackV>

      <StackV spacing={5} alignment="left">
        <Path name={bottomTick1} d="M 0 0 L 0 20" stroke-dasharray="5" />
        <Ref select={props.selectBottomLeft} />
      </StackV>
      <StackV spacing={5} alignment="right">
        <Path name={bottomTick2} d="M 0 0 L 0 20" stroke-dasharray="5" />
        <Ref select={props.selectBottomRight} />
      </StackV>

      <Line stroke-dasharray="5">
        <Ref select={topTick1} />
        <Ref select={bottomTick1} />
      </Line>
      <Line stroke-dasharray="5">
        <Ref select={topTick2} />
        <Ref select={bottomTick2} />
      </Line>
    </Group>
  );
});

const ActionText = withBluefish((props) => (
  <Text
    font-family="monospace"
    font-weight={500}
    font-size="20"
    fill="#4582DE"
    y={-3}
  >
    {props.text}
  </Text>
));

const LEFT_COLUMN_WIDTH = 200;
const DISK_DATA_WIDTH = 440;

export const DFSCQLogFigure = () => {
  return (
    <Bluefish>
      <StackV spacing={10} alignment="right">
        <TitledBackground title="LogAPI">
          <StackH>
            <BoxedAlign alignment="centerRight" width={LEFT_COLUMN_WIDTH}>
              <Text font-family="monospace" font-weight={300} font-size="18">
                activeTxn:
              </Text>
            </BoxedAlign>
            <Blocks
              colors={["#4582DE", "#4582DE", "#4582DE"]}
              name="activeTxnBlock"
            />
          </StackH>
        </TitledBackground>

        <ActionText text="commit" />

        <TitledBackground title="GroupLog">
          <StackH>
            <BoxedAlign alignment="centerRight" width={LEFT_COLUMN_WIDTH}>
              <Text font-family="monospace" font-weight={300} font-size="18">
                committedTxns:
              </Text>
            </BoxedAlign>
            <BigLeftBracket name="bigleftbracket" />
            <StackH spacing={0}>
              <Blocks colors={Array(2).fill("gray")} />
              <BigComma />
            </StackH>
            <StackH spacing={0}>
              <Blocks colors={Array(7).fill("gray")} />
              <BigComma />
            </StackH>
            <StackH spacing={0}>
              <Blocks colors={Array(4).fill("gray")} />
              <BigComma />
            </StackH>
            <StackH spacing={0}>
              <Blocks
                colors={Array(3).fill("#4582DE")}
                name="committedTxnsBlock"
              />
              <BigComma />
            </StackH>
            <BigRightBracket name="bigrightbracket" />
          </StackH>
        </TitledBackground>

        <ActionText text="flush" />

        <TitledBackground title="DiskLog">
          <StackH>
            <Rect
              height={0}
              width={LEFT_COLUMN_WIDTH}
              fill="transparent"
              name="disklogleft"
            ></Rect>

            <Group>
              <StackH spacing={0} name="mem">
                <Block width={80} name="rect1" />
                <Block width={80} color="LightGray" name="rect2" />
                <Block width={80} color="LightGray" name="rect3" />
                <Blocks
                  colors={Array(7).fill("gray")}
                  name="blocks1"
                  width={10}
                ></Blocks>
                <Blocks
                  colors={Array(3).fill("#4582DE")}
                  name="blocks2"
                  width={10}
                ></Blocks>
                <Block width={100} color="white" name="rect4" />
              </StackH>
              <Rect height={3} name="line"></Rect>

              <StackV spacing={15} alignment="left">
                <Ref select="rect1" />
                <Rect height={5 * 2 + 3} width={3} name="disklogtick1"></Rect>
              </StackV>
              <StackV spacing={15} alignment="left">
                <Ref select="rect2" />
                <Rect height={5 * 2 + 3} width={3} name="disklogtick2"></Rect>
              </StackV>
              <StackV spacing={15} alignment="left">
                <Ref select="rect4" />
                <Rect height={5 * 2 + 3} width={3} name="disklogtick3"></Rect>
              </StackV>
              <StackV spacing={15} alignment="right">
                <Ref select="rect4" />
                <Rect height={5 * 2 + 3} width={3} name="disklogtick4"></Rect>
              </StackV>

              <StackV spacing={30}>
                <Ref select="rect1" />
                <StackV spacing={0}>
                  <Text font-family="serif" font-weight={300} font-size={18}>
                    Log
                  </Text>
                  <Text font-family="serif" font-weight={300} font-size={18}>
                    header
                  </Text>
                </StackV>
              </StackV>
              <StackV spacing={30}>
                <Group>
                  <Ref select="rect2" />
                  <Ref select="rect3" />
                  <Ref select="blocks1" />
                  <Ref select="blocks2" />
                </Group>

                <Text font-family="serif" font-weight={300} font-size={18}>
                  Log data
                </Text>
              </StackV>
              <StackV spacing={30}>
                <Ref select="rect4" />
                <StackV spacing={0}>
                  <Text
                    font-family="serif"
                    font-weight={300}
                    font-size={18}
                    x={6}
                  >
                    Available log
                  </Text>
                  <Text font-family="serif" font-weight={300} font-size={18}>
                    space
                  </Text>
                </StackV>
              </StackV>

              <Distribute direction="vertical" spacing={20}>
                <Ref select="mem" />
                <Ref select="line" />
              </Distribute>

              <LayoutFunction
                f={({ left, width, right }) => ({ left, width, right })}
              >
                <Ref select="mem" />
                <Ref select="line" />
              </LayoutFunction>
            </Group>
          </StackH>
        </TitledBackground>

        <ActionText text="apply" />

        <TitledBackground title="Applier">
          <StackH>
            <Rect
              height={0}
              width={LEFT_COLUMN_WIDTH}
              fill="transparent"
              name="applierleft"
            ></Rect>
            <StackV spacing={50}>
              <StackH spacing={0} name="diskdata">
                <Block width={50} color="LightGray" />
                <Blocks colors={Array(7).fill("gray")} width={10}></Blocks>
                <Blocks colors={Array(3).fill("#4582DE")} width={10}></Blocks>
              </StackH>
              <Background>
                <StackH spacing={0} name="diskdataStack">
                  <For each={Array(5).fill(1)}>
                    {(o, i) => (
                      <Rect
                        height={40}
                        width={DISK_DATA_WIDTH / 5}
                        fill="white"
                        name={`diskdata${i() + 1}`}
                      />
                    )}
                  </For>
                </StackH>
              </Background>
            </StackV>
          </StackH>
        </TitledBackground>
      </StackV>

      <Text
        font-family="monospace"
        font-weight={300}
        name="disk_log"
        font-size="18"
      >
        disk log:
      </Text>
      <Align alignment="centerY">
        <Ref select="disk_log" />
        <Ref select="mem" />
      </Align>
      <Align alignment="right">
        <Ref select="disklogleft" />
        <Ref select="disk_log" />
      </Align>

      <Text
        font-family="monospace"
        font-weight={300}
        name="disk_data"
        font-size="18"
      >
        disk data:
      </Text>
      <Align alignment="centerY">
        <Ref select="disk_data" />
        <Ref select="diskdataStack" />
      </Align>
      <Align alignment="right">
        <Ref select="disk_data" />
        <Ref select="applierleft" />
      </Align>

      <DashedFunnel
        selectTopLeft="bigleftbracket"
        selectTopRight="bigrightbracket"
        selectBottomLeft="blocks1"
        selectBottomRight="blocks2"
      />

      <DashedFunnel
        selectTopLeft="disklogtick2"
        selectTopRight="disklogtick3"
        selectBottomLeft="diskdata"
        selectBottomRight="diskdata"
      />

      <StackV spacing={50}>
        <Rect
          width={80}
          height={1}
          fill="transparent"
          name="diskdataplaceholder"
        />
        <Ref select="diskdataStack" />
      </StackV>
      <Arrow stretch={0} bow={0}>
        <Ref select="diskdataplaceholder" />
        <Ref select="diskdata1" />
      </Arrow>
      <Arrow stretch={0} bow={0}>
        <Ref select="diskdataplaceholder" />
        <Ref select="diskdata2" />
      </Arrow>
      <Arrow stretch={0} bow={0}>
        <Ref select="diskdataplaceholder" />
        <Ref select="diskdata3" />
      </Arrow>
      <Arrow stretch={0} bow={0}>
        <Ref select="diskdataplaceholder" />
        <Ref select="diskdata4" />
      </Arrow>
      <Arrow stretch={0} bow={0}>
        <Ref select="diskdataplaceholder" />
        <Ref select="diskdata5" />
      </Arrow>

      <Arrow stretch={0}>
        <Ref select="activeTxnBlock" />
        <Ref select="committedTxnsBlock" />
      </Arrow>

      <StackV spacing={70}>
        <Rect width={10} height={10} fill="transparent" name="placeholder" />
        <Ref select="blocks1" />
      </StackV>

      <Arrow stretch={0} bow={0}>
        <Ref select="placeholder" />
        <Ref select="blocks1" />
      </Arrow>
    </Bluefish>
  );
};
