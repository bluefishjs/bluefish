import { ParentProps, JSX, mergeProps } from "solid-js";
import { StackArgs, stackLayout } from "./stackLayout";
import withBluefish from "./withBluefish";
import Layout from "./layout";
import { BBox, Transform, ChildNode } from "./scenegraph";
import { AlignmentVertical } from "./align";
import { Stack } from "./stack";

export type StackHProps = ParentProps<
  Omit<StackArgs, "direction"> & { alignment?: AlignmentVertical }
>;

export const StackH = withBluefish(
  (props: StackHProps) => {
    const stackProps = mergeProps(
      {
        direction: "horizontal" as const,
        alignment: "centerY" as const,
      },
      props
    );

    return <Stack {...stackProps} />;
  },
  { displayName: "StackH" }
);
