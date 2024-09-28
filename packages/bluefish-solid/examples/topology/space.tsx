import { ParentProps } from "solid-js";
import { Id, withBluefish } from "../../src";
import Background from "../../src/background";

export type SpaceProps = ParentProps<{
  name: Id;
}>;

export const Space = withBluefish((props: SpaceProps) => {
  return (
    <Background name={props.name} padding={25}>
      {props.children}
    </Background>
  );
});
