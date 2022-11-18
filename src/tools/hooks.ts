import { RefObject, useEffect, useRef, useState } from 'react';

export const useMounted = (cb: Function) => {
  let mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      cb();
    }
  }, []);
};

export const useUnMount = (cb: Function) => {
  useEffect(() => {
    return () => cb();
  }, []);
};

export const useDebounce = (value: any, delay = 300) => {
  const [v, setV] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setV(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return v;
};

export const useDebounceFn = (cb: Function, delay = 300) => {
  const timer = useRef<any>(null);

  return (...args: any) => {
    if (timer) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      cb.call(undefined, ...args);
    }, delay);
  };
};

export const useThrottle = (value: any, time = 300) => {
  const [v, setV] = useState(value);
  const cd = useRef<boolean>(false);

  useEffect(() => {
    if (!cd.current) {
      setV(value);
      cd.current = true;
      setTimeout(() => (cd.current = false), time);
    }
  }, [value]);

  return v;
};

/**
 * 点击空白处提示列表消失用
 */
export function useClickOut(ref: RefObject<HTMLDivElement>, callback: Function) {
  function click(e: MouseEvent) {
    if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
      return;
    }
    callback();
  }

  useEffect(() => {
    document.addEventListener('click', click);
    return () => document.removeEventListener('click', click);
  }, []);
}
