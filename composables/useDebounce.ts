export default function useDebounce<T extends Function>(cb: T, delay = 350) {
  let timeoutId: NodeJS.Timeout;

  return (...args: T extends (...args: infer P) => any ? P : never[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      cb.apply(null, args);
    }, delay);
  };
}
