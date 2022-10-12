import classNames from 'classnames';
import React, { useContext, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
import { MenuModeType } from './MenuGroup';
import { MenuContext } from './useMenu';

export interface SubMenuProps {
  className?: string;
  children?: ReactNode;
  title?: string;
  padding?: number;
  name?: string;
  path?: string;
  mode?: MenuModeType;
  lv?: number;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { className, children, title, padding, path, mode, lv } = props;
  const menuContext = useContext(MenuContext);
  const clas = classNames('cat-submenu', className);
  const { onClick, show, ...hover } = useShow(props);
  const titleClass = classNames('cat-submenu-title', {
    'cat-menu-cur-txt': isCur(menuContext.curPath, path!),
    'cat-menu-cur-bottom': isCur(menuContext.curPath, path!) && mode === 'horizon' && lv === 1,
  });
  const listClass = classNames('cat-submenu-list', {
    'cat-menu-show-inline': mode === 'inline' && show,
    'cat-menu-show-right': mode === 'vertical' && show,
    'cat-menu-show-bottom': mode === 'horizon' && show,
    'cat-submenu-list-shadow': mode !== 'inline',
  });

  function newChildren() {
    const padding = props.padding || 0;

    return React.Children.map(children, (c, i) => {
      const child = c as React.FunctionComponentElement<SubMenuProps>;
      const name = child.props.name || String(i);
      const paddingLeft = mode === 'inline' ? padding + menuContext.inlineIndent : padding;

      return React.cloneElement(child, {
        padding: paddingLeft,
        name,
        path: `${path}-${name}`,
        mode: child.props.mode || mode,
        lv: lv! + 1,
      });
    });
  }

  return (
    <div className={clas} {...hover}>
      <div className={titleClass} style={{ paddingLeft: padding }} onClick={onClick}>
        <span>{title}</span>
        {mode === 'inline' && <span>{show ? '△' : '▽'}</span>}
        {mode === 'vertical' && <span>{'▷'}</span>}
      </div>
      <ul className={listClass}>{newChildren()}</ul>
    </div>
  );
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;

function useShow(props: SubMenuProps) {
  const [show, setShow] = useState(false);
  const timer = useRef<any>(null);

  return {
    show,

    onClick() {
      if (props.mode === 'inline') {
        setShow(!show);
      }
    },

    onMouseEnter() {
      if (props.mode === 'vertical' || props.mode === 'horizon') {
        timer.current && clearTimeout(timer.current);
        setShow(true);
      }
    },

    onMouseLeave() {
      if (props.mode === 'vertical' || props.mode === 'horizon') {
        timer.current = setTimeout(() => setShow(false), 150);
      }
    },
  };
}
/**
 *
 * return true 的条件
 * 1: path 长度小于 curPath
 * 2: path 与 curPath 一一对应
 */
function isCur(curPath: string, path: string) {
  const cur = curPath.split('-');
  const p = path.split('-');
  if (p.length > cur.length) return false;
  for (let i = 0; i < p.length; i++) {
    if (cur[i] !== p[i]) return false;
  }
  return true;
}
