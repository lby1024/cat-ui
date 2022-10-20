import { useEffect, useRef, useState } from 'react';

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
