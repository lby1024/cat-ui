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
