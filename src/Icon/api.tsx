import classNames from 'classnames';
import React, { CSSProperties, FC, MouseEventHandler, useState } from 'react';
import './index.css';
import './iconfont.js';

export interface IconProps {
  className?: string;
  /**
   * 图标名
   */
  name?: string;
  /**
   * 图标颜色
   */
  color?: string;
  /**
   * 图标大小
   */
  size?: string;
  /**
   * hover时的图标颜色
   */
  hoverColor?: string;
}

const Icon: FC<IconProps> = (props) => {
  return <></>;
};
Icon.defaultProps = {
  color: 'currentColor',
  size: '1em',
};
export default Icon;
