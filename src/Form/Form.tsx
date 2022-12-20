import React, { FC, FormEvent, ReactNode, useRef, useState } from 'react';
import { CSSProperties } from 'styled-components';
import { useMounted } from '../tools/hooks';
import { Obj } from '../tools/type';
import useForm, { FormContext } from './useForm';

interface FormProps {
  className?: string;
  children?: ReactNode;
  initialValues?: Obj;
  onFinish?: Function;
  onFinishFailed?: Function;
  style?: CSSProperties;
}

const Form: FC<FormProps> = (props) => {
  const { children, initialValues, onFinish, onFinishFailed, style } = props;
  const formApi = useForm();

  useMounted(() => {
    if (initialValues) {
      formApi.setForm(initialValues);
    }
  });

  async function submit(e: FormEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const values = await formApi.validate();
      onFinish && onFinish(values);
    } catch (error) {
      onFinishFailed && onFinishFailed(error);
    }
  }

  return (
    <form onSubmit={submit} style={style}>
      <FormContext.Provider value={formApi}>{children}</FormContext.Provider>
    </form>
  );
};

export default Form;
