import classNames from 'classnames';
import React, { CSSProperties, FC, ReactElement, ReactNode } from 'react';
import './index.css';
import { MenuItemProps } from './MenuItem';
import { SubMenuProps } from './SubMenu';
import { MenuContext, useMenu } from './useMenu';

export type ModeType = 'inline' | 'vertical' | 'horizon';

interface MenuGroupProps {
  className?: string;
  children?: ReactNode;
  defaultPath?: string;
  style?: CSSProperties;
  onSelect?: Function;
  mode?: ModeType;
}

const MenuGroup: FC<MenuGroupProps> = (props) => {
  const { className, children, style, onSelect, defaultPath, mode } = props;
  const newChildren = getNewChildren(children, mode);
  const clas = classNames('cat-menu', className, {
    'cat-menu-horizon': mode === 'horizon',
  });
  const menuContext = useMenu({
    defaultPath,
    onSelect,
    mode,
  });

  return (
    <MenuContext.Provider value={menuContext}>
      <ul className={clas} style={style}>
        {newChildren}
      </ul>
    </MenuContext.Provider>
  );
};
MenuGroup.defaultProps = {
  mode: 'inline',
};
export default MenuGroup;

function getNewChildren(children: ReactNode, mode?: ModeType) {
  return React.Children.map(children, (c, i) => {
    const child = c as React.FunctionComponentElement<SubMenuProps>;
    const { displayName } = child.type;
    if (displayName === 'SubMenu' || displayName === 'MenuItem') {
      return React.cloneElement(child, {
        name: child.props.name || String(i),
        path: child.props.name || String(i),
        mode: child.props.mode || mode,
      });
    }
    console.error('Menu的child必须是MenuItem或SubMenu');
  });
}
