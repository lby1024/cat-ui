import classNames from 'classnames';
import React, { CSSProperties, FC, forwardRef } from 'react';
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
}

const Icon: FC<IconProps> = (props) => {
  const { className, name, size, color } = props;
  const clas = classNames('cat-icon', className, {});

  const style: CSSProperties = {
    width: size,
    height: size,
    fill: color,
  };

  return (
    <svg className={clas} aria-hidden="true" style={style}>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
};
Icon.defaultProps = {
  color: 'currentColor',
  size: '1em',
};
export default Icon;
