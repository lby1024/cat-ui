import classNames from 'classnames';
import React, { FC, useContext } from 'react';
import { ModeType } from './MenuGroup';
import { MenuContext, useLv } from './useMenu';

export interface MenuItemProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  name?: string;
  path?: string;
  mode?: ModeType;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { children, className, path, mode } = props;
  const lv = useLv(path);
  const { curPath, setPath } = useContext(MenuContext);
  const clas = classNames('cat-menu-item', className, {
    'cat-menu-cur-bg': curPath === path,
    'cat-menu-cur-right': mode === 'inline' && lv === 1 && curPath === path,
    'cat-menu-cur-bottom': mode === 'horizon' && lv === 1 && curPath === path,
  });

  function click() {
    if (!setPath) return;
    setPath(path);
  }

  const style = mode === 'inline' ? { paddingLeft: 20 * lv } : {};

  return (
    <li className={clas} style={style} onClick={click}>
      {children}
    </li>
  );
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
