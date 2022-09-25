import classNames from 'classnames';
import React, { FC } from 'react';
import './index.css';

interface InputProps {
  className?: string;
}

const Input: FC<InputProps> = (props) => {
  const { className } = props;

  const clas = classNames({
    'cat-input': true,
    [className as string]: !!className,
  });

  return <div>Input</div>;
};

export default Input;
