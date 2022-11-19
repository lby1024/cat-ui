import classNames from 'classnames';
import { FC, ReactNode, useContext } from 'react';
import { MenuModeType } from './MenuGroup';
import { MenuContext } from './useMenu';

interface MenuItemProps {
  className?: string;
  children?: ReactNode;
  padding?: number;
  name?: string;
  path?: string;
  mode?: MenuModeType;
  lv?: number;
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { className, children, padding, path, mode, lv } = props;
  const menuContext = useContext(MenuContext);
  const isCur = menuContext.curPath === path;
  const clas = classNames('cat-menu-item', className, {
    'cat-menu-cur-right': mode === 'inline' && isCur, // border-right 高亮
    'cat-menu-cur-bg': curBg(), // background 高亮
    'cat-menu-cur-bottom': mode === 'horizon' && lv === 1 && isCur, // border-buttom 高亮
  });

  function curBg() {
    if (isCur) {
      if (mode === 'vertical') return true;
      if (mode === 'horizon' && lv! > 1) return true;
    }
    return false;
  }

  function click() {
    menuContext.setCurPath(path!);
  }

  return (
    <li className={clas} style={{ paddingLeft: padding }} onClick={click}>
      {children}
    </li>
  );
};

export default MenuItem;
