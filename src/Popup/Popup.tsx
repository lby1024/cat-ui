import { useDebounceFn } from '../tools/hooks';
import React, { FC, ReactElement, useRef, useState } from 'react';
import Overlay from '../Overlay';
import './index.css';

interface PopupProps {
  /**
   * 弹框类容
   */
  overLay: any;
  /**
   * 弹框位置
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * trigger 按钮
   */
  children: ReactElement;
  /**
   * 触发事件
   */
  event?: 'click' | 'hover';
}

const Popup: FC<PopupProps> = (props) => {
  const { placement, children, overLay, event } = props;
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const onMouseEnter = useDebounceFn(() => {
    if (event === 'hover') setVisible(true);
  }, 100);

  const onMouseLeave = useDebounceFn(() => {
    if (event === 'hover') setVisible(false);
  }, 100);

  const onClick = useDebounceFn(() => {
    if (event === 'click') setVisible(!visible);
  }, 100);

  const child = React.Children.only(children); // 只能传一个child 否则报错
  let newChild = React.cloneElement(child, {
    onMouseEnter,
    onMouseLeave,
    onClick,
    ref: btnRef,
  });

  return (
    <>
      {newChild}

      <Overlay
        visible={visible}
        onVisibleChange={(vi) => setVisible(vi)}
        btnRef={btnRef}
        placement={placement}
      >
        {overLay}
      </Overlay>
    </>
  );
};

Popup.defaultProps = {
  placement: 'right',
  event: 'hover',
};

export default Popup;
