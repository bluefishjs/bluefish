import { ParentProps } from "solid-js";
import { Id, withBluefish } from "../../src";
import Background from "../../src/background";

export type ImageProps = ParentProps<{
  name: Id;
}>;

export const Image = withBluefish((props: ImageProps) => {
  return (
    <Background name={props.name} padding={20}>
      {props.children}
    </Background>
  );
});
