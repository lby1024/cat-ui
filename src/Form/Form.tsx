import React, { FC, FormEvent, ReactNode, useRef, useState } from 'react';
import { CSSProperties } from 'styled-components';
import { useMounted } from '../tools/hooks';
import { Obj } from '../tools/type';
import useForm, { FormContext } from './useForm';

interface FormProps {
  className?: string;
  children?: ReactNode;
  /**
   * 表单默认值，只有初始化以及重置时生效
   */
  initialValues?: Obj;
  /**
   * 提交表单且数据验证成功后回调事件
   */
  onFinish?: Function;
  /**
   * 提交表单且数据验证失败后回调事件
   */
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
