import React, { useMemo, useState } from 'react';
import { ModeType } from './MenuGroup';

interface useMemoProps {
  defaultPath?: string;
  onSelect?: Function;
  mode?: ModeType;
}

export function useMenu(props: useMemoProps) {
  const [cur, setCur] = useState('0');

  function setPath(path?: string) {
    if (!path) return;
    setCur(path);
    if (!props.onSelect) return;
    props.onSelect({
      name: path.split('-').pop(),
      path,
    });
  }

  return {
    curPath: cur,
    setPath,
    mode: props.mode,
  };
}

type useMenuReturn = ReturnType<typeof useMenu>;
type IMenuContext = Partial<useMenuReturn>;
export const MenuContext = React.createContext<IMenuContext>({});

export function useLv(path?: string) {
  const lv = useMemo(() => {
    if (path) {
      return path.split('-').length;
    }
    return 1;
  }, [path]);

  return lv;
}
