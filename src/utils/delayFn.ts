export function delayTimeout(
  fn: VoidFunction,
  ms: number
): ReturnType<typeof setTimeout> {
  return setTimeout(fn, ms);
}
