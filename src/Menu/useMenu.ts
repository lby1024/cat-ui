import React, { useState } from 'react';
import { MenuProps } from './MenuGroup';

export function useMenu(props: MenuProps) {
  const { onSelect, inlineIndent } = props;
  const [curPath, setPath] = useState('0');

  function setCurPath(path: string) {
    setPath(path);
    if (!onSelect) return;
    const name = path.split('-').pop();
    onSelect({ name, path });
  }

  return {
    inlineIndent: inlineIndent || 20,
    curPath,
    setCurPath,
  };
}

type useMenuRetury = ReturnType<typeof useMenu>;
export const MenuContext = React.createContext<useMenuRetury>({
  inlineIndent: 20,
  curPath: '0',
  setCurPath: () => {},
});
