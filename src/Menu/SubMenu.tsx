import classNames from 'classnames';
import React, { FC, ReactNode, useContext, useRef, useState } from 'react';
import { ModeType } from './MenuGroup';
import { MenuContext, useLv } from './useMenu';

export interface SubMenuProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  title?: string;
  path?: string;
  name?: string;
  mode?: ModeType;
}

const SubMenu: FC<SubMenuProps> = (props) => {
  const { title, path, className, children, mode } = props;
  const newChildren = getNewChildren(children, props);
  const lv = useLv(path);
  const menuContext = useContext(MenuContext);
  const clas = classNames('cat-sub', className);
  const { show, onClick, clickHide, ...hover } = useShow(props);
  const titleClass = classNames('cat-sub-title', {
    'cat-menu-cur-txt': isCur() && mode !== 'horizon',
    'cat-menu-cur-bottom': isCur() && mode === 'horizon',
  });
  const listClass = classNames('cat-sub-list', {
    'cat-show-vertical': mode === 'vertical' && show,
    'cat-show-inline': mode == 'inline' && show,
    'cat-show-horizon': mode === 'horizon' && show,
  });

  function isCur() {
    if (path && menuContext.curPath) {
      return menuContext.curPath.includes(path);
    }
    return false;
  }

  const style = mode === 'inline' ? { paddingLeft: 20 * lv } : {};

  return (
    <div className={clas} {...hover} onClick={clickHide}>
      <div className={titleClass} style={style} onClick={onClick}>
        <span>{title}</span>
        {mode !== 'horizon' && <Arrow show={show} />}
      </div>
      <ul className={listClass}>{newChildren}</ul>
    </div>
  );
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;

function useShow(props: SubMenuProps) {
  const { mode } = props;
  const [show, setShow] = useState(false);
  const timer = useRef<any>(null);

  function onClick() {
    if (mode !== 'inline') return;
    setShow(!show);
  }

  function onMouseEnter() {
    if (mode === 'inline') return;
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    setShow(true);
  }

  function onMouseLeave() {
    if (mode === 'inline') return;
    timer.current = setTimeout(() => {
      setShow(false);
    }, 250);
  }

  function clickHide(e: any) {
    if (mode === 'inline') return;
    if (e.target.tagName === 'LI') {
      setShow(false);
    }
  }

  return {
    show,
    onClick,
    onMouseEnter,
    onMouseLeave,
    clickHide,
  };
}

function getNewChildren(children: ReactNode, props: SubMenuProps) {
  return React.Children.map(children, (c, i) => {
    const child = c as React.FunctionComponentElement<SubMenuProps>;
    const { displayName } = child.type;
    if (displayName === 'SubMenu' || displayName === 'MenuItem') {
      let name = child.props.name || String(i);
      let m = props.mode === 'horizon' ? 'vertical' : props.mode;
      return React.cloneElement(child, {
        name,
        path: `${props.path}-${name}`,
        mode: child.props.mode || m,
      });
    }
    console.error('Menu的child必须是MenuItem或SubMenu');
  });
}

const Arrow = (props: { show: boolean }) => {
  return <span>{props.show ? '👇' : '👈'}</span>;
};
