import * as deepmerge from 'deepmerge';
import deepEqual from 'fast-deep-equal';

import { RecursivePartial } from '.';

export function merge<T>(base: T, ...partials: (RecursivePartial<T> | undefined)[]): T {
  return deepmerge(base, mergePartial(...partials));
}

export function mergePartial<T>(...partials: (RecursivePartial<T> | undefined)[]): RecursivePartial<T> {
  var base = {} as RecursivePartial<T>;
  partials.forEach((partial?: RecursivePartial<T>): void => {
    if (!partial) {
      return;
    }
    base = deepmerge(base, partial);
  });
  return base;
}

export function deepCompare<T>(object1: T, object2: T): boolean {
  return deepEqual(object1, object2);
}