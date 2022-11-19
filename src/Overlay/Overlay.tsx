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
import Show from '../Show';
import './index.css';

interface OverlayProps {
  children: ReactElement;
  /**
   * 显示隐藏
   */
  visible: boolean;
  /**
   * 点击空白处触发
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
  const { children, visible, onVisibleChange, btnRef } = props;
  const [overLayCb, overLayRef, style] = usePosition(props);
  useClickOut([overLayRef, btnRef], () => onVisibleChange(false));

  const child = React.Children.only(children); // 只能传一个child 否则报错
  const newChild = React.cloneElement(child, {
    ref: overLayCb,
    style,
  });

  return ReactDom.createPortal(
    <Show duration={320} show={visible} display="inline-block">
      {newChild}
    </Show>,
    document.body,
  );
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
    top: 0,
    left: 0,
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
