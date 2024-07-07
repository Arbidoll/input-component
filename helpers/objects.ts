export function mergeObjects<T extends object, K extends object>(
  objectA: T,
  objectB: K,
): T & K {
  return { ...objectA, ...objectB };
}
