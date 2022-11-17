import classNames from 'classnames';
import React, { FC, ReactElement, useRef, useState } from 'react';
import Overlay from '../Overlay';
import './index.css';

interface TooltipProps {
  /**
   * 显示类容
   */
  text: string;
  /**
   * 显示位置
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: ReactElement;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { placement, children, text } = props;
  const btnRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const tipClass = classNames('cat-tooltip', {
    [`cat-tooltip-${placement}`]: placement,
  });

  const onMouseEnter = () => setVisible(true);
  const onMouseLeave = () => setVisible(false);

  const child = React.Children.only(children); // 只能传一个child 否则报错
  let newChild = React.cloneElement(child, {
    onMouseEnter,
    onMouseLeave,
    ref: btnRef,
  });

  const Card = (
    <div className={tipClass}>
      <div className="text">{text}</div>
      <div className="arrow"></div>
    </div>
  );

  return (
    <>
      {newChild}

      <Overlay
        visible={visible}
        onVisibleChange={(vi) => setVisible(vi)}
        btnRef={btnRef}
        placement={placement}
      >
        {Card}
      </Overlay>
    </>
  );
};

Tooltip.defaultProps = {
  placement: 'top',
};

export default Tooltip;
