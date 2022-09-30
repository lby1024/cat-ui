import classNames from 'classnames';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import './index.css';

interface RadioItemProps {
  className?: string;
  /**
   * 指定当前是否选中
   * @default false
   */
  checked?: boolean;
  /**
   * 禁用 Radio
   * @default false
   */
  disabled?: boolean;
  /**
   * 根据 value 进行比较，判断是否选中
   */
  value?: string;
  /**
   * 选项变化时的回调函数
   */
  onChange?: (e: string) => void;
  children?: ReactNode;
}

const RadioItem: FC<RadioItemProps> = (props) => {
  const { className, disabled, onChange, value } = props;

  const [checked, setChecked] = useState(false);

  const clas = classNames({
    'cat-radio': true,
    'cat-radio-disabled': disabled,
    [className as string]: !!className,
  });

  const clasLeft = classNames({
    'cat-radio-left': true,
    'cat-radio-checked': checked,
  });

  useEffect(() => {
    if (typeof props.checked !== 'boolean') {
      return;
    }
    if (props.checked !== checked) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  const click = () => {
    if (disabled) return;
    setChecked(true);
    if (value && typeof onChange === 'function') {
      onChange(value);
    }
  };

  return (
    <span className={clas} onClick={click}>
      <span className={clasLeft}></span>
      <span className="cat-radio-label">{props.children}</span>
    </span>
  );
};

export default RadioItem;
