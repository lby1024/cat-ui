import classNames from 'classnames';
import React, { ChangeEvent, FC, ReactElement, useContext } from 'react';
import { useMounted } from '../tools/hooks';
import './index.css';
import { FormContext } from './useForm';
import { FormItemRule } from './valitate';

interface FormItemProps {
  className?: string;
  children?: ReactElement;
  label?: string;
  name?: string;
  trigger?: 'onChange' | 'onBlur';
  rules?: FormItemRule[];
}

const FormItem: FC<FormItemProps> = (props) => {
  const { className, children, name, trigger, rules } = props;
  const formApi = useContext(FormContext);

  const clas = classNames({
    'cat-form-item': true,
    [className as string]: !!className,
  });

  useMounted(() => {
    formApi.regist(name, rules);
  });

  const newChildren = React.Children.map(children, (child) => {
    if (!child) return null;
    return React.cloneElement(child, {
      value: formApi.getValue(name) || '',
      onChange,
      onBlur,
    });
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const valuse = formApi.setValue(name, e.target.value);
    if (trigger === 'onChange') {
      formApi.validateItem(name, valuse);
    }
  }

  function onBlur(e: Event) {
    if (trigger === 'onBlur') {
      const values = formApi.getForm();
      formApi.validateItem(name, values);
    }
  }

  return (
    <div className={clas}>
      <div className="cat-form-label">{props.label}</div>
      <div className="cat-form-right">
        <div>{newChildren}</div>
        <div className="cat-form-msg">{formApi.getFormItemError(name)}</div>
      </div>
    </div>
  );
};

FormItem.defaultProps = {
  trigger: 'onChange',
};

export default FormItem;