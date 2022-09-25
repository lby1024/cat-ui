import React, { FC, ReactElement, useState } from 'react';
import RadioItem from './RadioItem';

interface radioGroupProps {
  className?: string;
  /**
   * @description 用于设置当前选中的值
   */
  value?: string;
  /**
   * @description 选项变化时的回调函数
   */
  onChange?: (v: string) => void;
  children?: ReactElement;
}

const RadioGroup: FC<radioGroupProps> = (props) => {
  const { children } = props;
  const [value, setValue] = useState(props.value);

  const newChildren = React.Children.map(children, (child) => {
    if (child?.type !== RadioItem) {
      return null;
    }

    return React.cloneElement(child, {
      checked: child.props.value === value,
      onChange,
    });
  });

  function onChange(value: string) {
    setValue(value);
    if (typeof props.onChange === 'function') {
      props.onChange(value);
    }
  }

  return <span className={props.className}>{newChildren}</span>;
};

export default RadioGroup;
