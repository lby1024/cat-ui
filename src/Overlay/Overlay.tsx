import classNames from 'classnames';
import React, {
  FC,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import ReactDom from 'react-dom';
import { CSSProperties } from 'styled-components';
import './index.css';

interface OverlayProps {
  className?: string;
  children: ReactElement;
  /**
   * 显示隐藏
   */
  visible: boolean;
  /**
   * 显示隐藏回调
   */
  onVisibleChange: (visible: boolean) => void;
  /**
   * 按钮ref
   */
  btnRef: RefObject<HTMLElement>;
  /**
   * 显示位置
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const Overlay: FC<OverlayProps> = (props) => {
  const { className, children, visible, onVisibleChange, btnRef } = props;
  const clas = classNames('cat-overlay', className);
  const [overLayCb, overLayRef, style] = usePosition(props);
  useClickOut([overLayRef, btnRef], () => onVisibleChange(false));

  const newChildren = React.cloneElement(children, {
    ref: overLayCb,
    style,
  });

  if (!visible) return null;
  return ReactDom.createPortal(<div className={clas}>{newChildren}</div>, document.body);
};

Overlay.defaultProps = {
  placement: 'bottom',
};

export default Overlay;

/**
 * 点击空白处 隐藏 overlay
 */
function useClickOut(refs: RefObject<any>[], hide: Function) {
  function fn(e: MouseEvent) {
    for (let i = 0; i < refs.length; i++) {
      const ref = refs[i];
      if (ref.current?.contains(e.target)) return;
    }
    hide();
  }

  useEffect(() => {
    document.addEventListener('click', fn);
    return () => document.removeEventListener('click', fn);
  }, []);
}
/**
 * 弹框的位置
 */
function usePosition(props: OverlayProps) {
  const overLayRef = useRef<any>(null);
  const [style, setStyle] = useState<CSSProperties>({});

  const overLayCb = useCallback((overLayNode: HTMLElement) => {
    overLayRef.current = overLayNode;
    if (overLayNode) {
      const positon = getPlacement(props, overLayNode);
      setStyle(positon);
    }
  }, []);

  return [overLayCb, overLayRef, style] as const;
}

function getPlacement(props: OverlayProps, overLayNode: HTMLElement): CSSProperties {
  const { btnRef, placement } = props;
  if (!btnRef.current) {
    return {};
  }

  const { top, left, width, height } = btnRef.current.getBoundingClientRect();
  const { scrollLeft, scrollTop } = document.documentElement;
  const style: CSSProperties = {
    position: 'absolute',
  };

  if (placement === 'bottom') {
    style.top = scrollTop + top + height;
    style.left = scrollLeft + left;
  }
  if (placement === 'right') {
    style.top = scrollTop + top;
    style.left = scrollLeft + left + width;
  }
  if (placement === 'left') {
    style.top = scrollTop + top;
    style.left = scrollLeft + left - overLayNode.offsetWidth;
  }
  if (placement === 'top') {
    style.top = scrollTop + top - overLayNode.offsetHeight;
    style.left = scrollLeft + left;
  }

  return style;
}
