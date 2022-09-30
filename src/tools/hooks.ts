import { useEffect, useRef } from 'react';

export const useMounted = (cb: Function) => {
  let mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      cb();
    }
  }, []);
};
