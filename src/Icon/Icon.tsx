import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';
import './index.css';
import './iconfont.js';

export interface IconProps {
  name?: string;
  className?: string;
  color?: string;
  size?: string;
}

const Icon: FC<IconProps> = (props) => {
  const { className, name, size, color } = props;
  console.log(name, size, color);

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
