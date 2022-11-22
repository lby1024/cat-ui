import React, { useRef, useState } from 'react';
import { Obj } from '../tools/type';
import Validator, { FormErrors, FormItemRule, FormRules } from './valitate';

export const FormContext = React.createContext<any>(null);

export default function useForm() {
  const [values, setValues] = useState<Obj>({});
  const [formErrors, setformErrors] = useState<FormErrors>({});
  const formRules = useRef<FormRules>({});
  const validator = useRef<Validator | null>(null);

  // values: {} --> {username: undefind}
  function valuesAddName(name: string) {
    setValues((v) => {
      v[name] = undefined;
      return { ...v };
    });
  }
  // formErrors: {username} --> {username, password}
  function setFormItemError(name: string, formItemErrors: string[]) {
    setformErrors((errs) => {
      errs[name] = formItemErrors;
      return { ...errs };
    });
  }
  // formErrors: {username, password} --> {username}
  function clearFormItemError(name: string) {
    setformErrors((errs) => {
      delete errs[name];
      return { ...errs };
    });
  }

  return {
    getForm() {
      return values;
    },

    getValue(name?: string) {
      if (name) {
        return values[name];
      }
    },

    setValue(name?: string, value?: any) {
      let currentValues = { ...values };
      if (name) {
        currentValues[name] = value;
        setValues(currentValues);
      }
      return currentValues;
    },
    /**
     *
     * values: {} -> {user: undefind}
     * formRules: {} -> {user: [{required: true}]}
     */
    regist(name?: string, formItemRules?: FormItemRule[]) {
      if (name) {
        valuesAddName(name);
      }
      // {} --> { username: [{require: true}] }
      if (name && formItemRules) {
        formRules.current[name] = formItemRules;
      }
    },

    setForm(values: Obj) {
      setValues((v) => {
        return { ...v, ...values };
      });
    },
    /**
     * 无误: 清除之前错误信息
     * 有误: 更新错误信息
     */
    async validateItem(name?: string, values?: Obj) {
      if (!name || !values) {
        return values;
      }
      if (!validator.current) {
        validator.current = new Validator(formRules.current);
      }
      try {
        const value = await validator.current.validateItem(name, values);
        clearFormItemError(name);
        return value;
      } catch (errors) {
        setFormItemError(name, errors as string[]);
        throw errors;
      }
    },
    /**
     * 有误: 更新error并 reject(error)
     * 无误: resolve(values)
     */
    async validate() {
      if (!validator.current) {
        validator.current = new Validator(formRules.current);
      }
      try {
        const res = await validator.current.validate(values);
        return res;
      } catch (errors) {
        setformErrors(errors as FormErrors);
        throw errors;
      }
    },

    getFormItemError(name?: string) {
      if (name) {
        return formErrors[name] ? formErrors[name][0] : '';
      }
    },
  };
}
