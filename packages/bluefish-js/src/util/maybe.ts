/* 
  Monadic functions for dealing with undefined values.
  Saves us a lot of boilerplate with undefined checks that make the code
  harder to read.
*/

// TODO: merge these two functions once I'm confident they're the same
export const maybeAdd = (a: number | undefined, b: number | undefined) =>
  a !== undefined && b !== undefined ? a + b : undefined;

export const maybeAddAll = (...xs: (number | undefined)[]) => {
  if (xs.every((x) => x !== undefined)) {
    let sum = 0;
    for (const x of xs) {
      sum += x!;
    }
    return sum;
  } else {
    return undefined;
  }
};

export const maybeSub = (a: number | undefined, b: number | undefined) =>
  a !== undefined && b !== undefined ? a - b : undefined;

export const maybeMul = (a: number | undefined, b: number | undefined) =>
  a !== undefined && b !== undefined ? a * b : undefined;

export const maybeDiv = (a: number | undefined, b: number | undefined) =>
  a !== undefined && b !== undefined ? a / b : undefined;

export const maybeMax = (xs: (number | undefined)[]) =>
  xs.every((x) => x !== undefined) ? Math.max(...(xs as number[])) : undefined;

// only returns undefined if all values are undefined, otherwise skips undefined values
export const maxOfMaybes = (xs: (number | undefined)[]) =>
  xs.every((x) => x === undefined)
    ? undefined
    : Math.max(...(xs.filter((x) => x !== undefined) as number[]));

export const maybeMin = (xs: (number | undefined)[]) =>
  xs.every((x) => x !== undefined) ? Math.min(...(xs as number[])) : undefined;

export const minOfMaybes = (xs: (number | undefined)[]) =>
  xs.every((x) => x === undefined)
    ? undefined
    : Math.min(...(xs.filter((x) => x !== undefined) as number[]));

export const maybe = <T, U>(x: T | undefined, f: (x: T) => U): U | undefined =>
  x !== undefined ? f(x) : undefined;
