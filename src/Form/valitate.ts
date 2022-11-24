import { Obj } from '../tools/type';

/**
 * 使用:
 *
 * 1. 生成校验器时传入规则
 * cosnt validtor = new Validator({
 *   username: [{require: true}, ... ],
 *   paddord: [{max: 12, min: 6}, ...]
 * })
 *
 * 2. 校验所有值
 * validtor.validate({
 *  username: 'jack',
 *  paddword: '123'
 * })
 *
 * 3. 校验某一项
 * validtor.validateItem('username', {
 *  username: 'jack',
 *  paddword: '123'
 * })
 */

export type FormErrors = { [name: string]: string[] };
export type FormRules = { [name: string]: FormItemRule[] };
export type FormItemRule = {
  required?: boolean;
  max?: number;
  min?: number;
  type?: any;
  validator?: Function;
  msg?: string;
};

export default class Validator {
  private formRules;

  constructor(formRules: FormRules) {
    this.formRules = formRules;
  }

  async validate(values: Obj) {
    const formErrors: FormErrors = {};
    for (let name in this.formRules) {
      try {
        await this.validateItem(name, values);
      } catch (errors) {
        formErrors[name] = errors as string[];
      }
    }
    if (Object.keys(formErrors).length) throw formErrors;
    else return values;
  }

  async validateItem(name: string, values: Obj) {
    const formItemRules = this.formRules[name];
    const formItemErr = await this.checkItem(name, values, formItemRules);
    if (formItemErr.length) throw formItemErr;
    else return values[name];
  }

  async checkItem(name: string, values: any, formItemRules: FormItemRule[]) {
    let formItemErr: string[] = [];
    const value = values[name];
    for (let rule of formItemRules) {
      if (rule.required === true && !value) {
        formItemErr.push(rule.msg || `${name}不能为空`);
      }
      if (rule.min && rule.min > value?.length) {
        formItemErr.push(rule.msg || `${name}长度不小于${rule.min}`);
      }
      if (rule.max && rule.max < value?.length) {
        formItemErr.push(rule.msg || `${name}长度不大于${rule.max}`);
      }
      if (rule.type && rule.type !== typeof value) {
        formItemErr.push(rule.msg || `${name}类型为${rule.type}`);
      }
      if (rule.validator) {
        const err = await rule.validator(value, values);
        if (err) formItemErr.push(err);
      }
    }
    return formItemErr;
  }
}
