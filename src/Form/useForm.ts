import React, { useRef, useState } from 'react';
import { Obj } from '../tools/type';
import Validator, { FormErrors, FormItemRule, FormRules } from './valitate';

export const FormContext = React.createContext(useForm());

export default function useForm() {
  const [values, setValues] = useState<Obj>({});
  const [formErrors, setformErrors] = useState<FormErrors>({});
  const formRules = useRef<FormRules>({});
  const validator = useRef<Validator | null>(null);

  // {username} --> {username, password}
  function setFormItemError(name: string, formItemErrors: string[]) {
    setformErrors((errs) => {
      errs[name] = formItemErrors;
      return { ...errs };
    });
  }
  // {username, password} --> {username}
  function clearFormItemError(name: string) {
    setformErrors((errs) => {
      delete errs[name];
      return { ...errs };
    });
  }
  // {} --> {username: undefind}
  function valuesAddName(name: string) {
    setValues((v) => {
      v[name] = undefined;
      return { ...v };
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
