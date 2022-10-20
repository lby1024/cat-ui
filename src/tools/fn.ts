export function throttle(cb: Function, time = 300) {
  let cd = false;
  return (...args: any) => {
    if (cd) return;
    cb.call(undefined, ...args);
    cd = true;
    setTimeout(() => (cd = false), time);
  };
}

export function debounce(cb: Function, delay = 300) {
  let timer: any;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.call(undefined, ...args);
    }, delay);
  };
}
