// a slightly modified excerpt of react-solid-state
import {
  memo,
  PropsWithChildren,
  useCallback as rCallback,
  useEffect as rEffect,
  useMemo as rMemo,
  useRef as rRef,
  useState as rState,
} from 'react';
import {
  createComputed as sComputed,
  createEffect as sEffect,
  createMemo as sMemo,
  createRoot,
  createSignal as sSignal,
  onCleanup as sCleanup,
  createReaction,
  EffectFunction,
  NoInfer,
  EffectOptions,
} from 'solid-js';

export function useForceUpdate() {
  const [, setTick] = rState(0);
  return rCallback(() => setTick((t) => t + 1), []);
}

export function useObserver<T>(fn: () => T) {
  const forceUpdate = useForceUpdate(),
    reaction = rRef<{ dispose: () => void; track: (fn: () => void) => void }>();
  if (!reaction.current) {
    reaction.current = createRoot((dispose) => ({
      dispose,
      track: createReaction(forceUpdate),
    }));
  }
  rEffect(() => reaction.current!.dispose, []);

  let rendering!: T;
  reaction.current.track(() => (rendering = fn()));
  return rendering;
}

export function withSolid<P extends object>(
  ComponentType: (props: PropsWithChildren<P>, r: any) => () => JSX.Element
) {
  // eslint-disable-next-line react/display-name
  return memo<P>((p, r) => {
    const component = ComponentType(p, r);
    // TODO: do we really need to break the rules here?
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return (component && useObserver(component)) || null;
  });
}

let inSolidEffect = false;
function trackNesting<T extends readonly any[]>(args: T): T {
  const fn = args[0] as (...args: readonly any[]) => void;
  return [
    function (...args: readonly any[]) {
      const outside = inSolidEffect;
      inSolidEffect = true;
      const ret = fn(...args);
      inSolidEffect = outside;
      return ret;
    },
    ...args.slice(1),
  ] as readonly any[] as T;
}

export function useEffect<Next>(
  fn: EffectFunction<undefined | NoInfer<Next>, Next>
): void;
export function useEffect<Next, Init = Next>(
  fn: EffectFunction<Init | Next, Next>,
  value: Init,
  options?: EffectOptions & {
    render?: boolean;
  }
): void;
export function useEffect<T>(
  fn: (v: T | undefined) => T,
  value?: T,
  options?: { name?: string }
) {
  if (inSolidEffect) {
    if (value === undefined) return sEffect(fn);
    return sEffect(fn, value, options);
  }
  const dispose = rRef<() => void>();
  rEffect(() => dispose.current, []);
  if (!dispose.current) {
    createRoot((disposer) => {
      dispose.current = disposer;
      if (value === undefined) {
        sEffect<T>(...trackNesting([fn] as const));
      } else {
        sEffect<T>(...trackNesting([fn, value, options] as const));
      }
    });
  }
}

export { useEffect as createEffect };
