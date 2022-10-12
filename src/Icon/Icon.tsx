import classNames from 'classnames';
import React, { FC } from 'react';
import './index.css';

interface IconProps {
  className?: string;
}

const Icon: FC<IconProps> = (props) => {
  const { className } = props;

  const clas = classNames('cat-icon', className, {});

  return <div>Icon</div>;
};

export default Icon;
