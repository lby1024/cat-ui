import { useDebounceFn } from '../tools/hooks';
import React, { FC, useRef, useState } from 'react';
import Overlay from '../Overlay';
import { OverlayProps } from '../Overlay/Overlay';
import './index.css';

type OverlayType = Pick<OverlayProps, 'children' | 'placement' | 'space' | 'duration'>;

interface PopupProps extends OverlayType {
  /**
   * 弹框类容
   */
  overLay: any;
  /**
   * 触发事件
   */
  event?: 'click' | 'hover';
}

const Popup: FC<PopupProps> = (props) => {
  const { placement, children, overLay, event, space } = props;
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<any>(null);

  const onMouseEnter = () => {
    if (event !== 'hover') return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(true);
    }, 100);
  };

  const onMouseLeave = () => {
    if (event !== 'hover') return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setVisible(false);
    }, 300);
  };

  const onClick = useDebounceFn(() => {
    if (event === 'click') setVisible(!visible);
  }, 100);

  const child = React.Children.only(children); // 只能传一个child 否则报错
  const newChild = React.cloneElement(child, {
    ...child.props,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ref: btnRef,
  });
  const newOverLay = React.cloneElement(overLay, {
    ...overLay.props,
    onMouseEnter,
    onMouseLeave,
  });

  return (
    <>
      {newChild}

      <Overlay
        visible={visible}
        onVisibleChange={(vi) => setVisible(vi)}
        btnRef={btnRef}
        placement={placement}
        space={space}
      >
        {newOverLay}
      </Overlay>
    </>
  );
};

Popup.defaultProps = {
  placement: 'right',
  event: 'hover',
};

export default Popup;
