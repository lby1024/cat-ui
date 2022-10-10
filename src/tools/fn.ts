export function throttle(cb: Function, time: number) {
  let cd = false;
  return (...args: any) => {
    if (cd) return;
    cb.call(undefined, ...args);
    cd = true;
    setTimeout(() => (cd = false), time);
  };
}
