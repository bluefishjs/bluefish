import { Component, JSX } from "solid-js";
import h from "solid-js/h";

import { Align as AlignJSX } from "./align";
import { Arrow as ArrowJSX } from "./arrow";
import { Background as BackgroundJSX } from "./background";
import { Blob as BlobJSX } from "./blob";
import { Bluefish as BluefishJSX } from "./bluefish";
import { Circle as CircleJSX } from "./circle";
import { StackV as StackVJSX } from "./stackv";
import { Distribute as DistributeJSX } from "./distribute";
import { Group as GroupJSX } from "./group";
import { Image as ImageJSX } from "./image";
import { Layout as LayoutJSX } from "./layout";
import { Rect as RectJSX } from "./rect";
import { Ref as RefJSX } from "./ref";
import { StackH as StackHJSX } from "./stackh";
import { Text as TextJSX } from "./text";
import { Path as PathJSX } from "./path";
import { withBluefish as withBluefishJSX } from "./withBluefish";

// @ts-expect-error idk why this doesn't typecheck, but I copied it from elsewhere
export function component<P>(
  fn: Component<P>
): (props: P, children: JSX.Element[]) => JSX.Element;
export function component<P>(
  fn: Component<P>
): (props: P, ...children: JSX.Element[]) => JSX.Element;
export function component<P>(
  fn: Component<P>
): (children: JSX.Element[]) => JSX.Element;
export function component<P>(
  fn: Component<P>
): (...children: JSX.Element[]) => JSX.Element;
export function component<P>(fn: Component<P>) {
  return (...args: any[]) => {
    return h(fn, ...args);
  };
}

export const Align = component(AlignJSX);
export const Arrow = component(ArrowJSX);
export const Background = component(BackgroundJSX);
export const Blob = component(BlobJSX);
export const Bluefish = component(BluefishJSX);
export const Circle = component(CircleJSX);
export const StackV = component(StackVJSX);
export const Distribute = component(DistributeJSX);
export const Group = component(GroupJSX);
export const Image = component(ImageJSX);
export const Layout = component(LayoutJSX);
export const Rect = component(RectJSX);
export const Ref = component(RefJSX);
export const StackH = component(StackHJSX);
export const Text = component(TextJSX);
export const Path = component(PathJSX);
export function withBluefish(WrappedComponent: Component) {
  return component(withBluefishJSX(WrappedComponent));
}
