import React, { FC, ReactElement, useState } from 'react';
import RadioItem from './RadioItem';

interface radioGroupProps {
  value?: string;
  children?: ReactElement;
  onChange?: (v: string) => void;
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

  return <span>{newChildren}</span>;
};

export default RadioGroup;
