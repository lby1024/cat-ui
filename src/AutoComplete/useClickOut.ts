import { RefObject, useEffect } from 'react';
import { useMounted } from '../tools/hooks';

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
