# Form

### 基础

```tsx
import React from 'react';
import { Form } from '../index';

const initialValues = {
  username: 'jack',
};

const rules: Rules = {
  username: [{ required: true, min: 3, max: 6 }],
  password: [
    { required: true, msg: '必填' },
    { min: 6, msg: '密码太短了' },
    { max: 12, msg: '密码太长了' },
  ],
  repassword: [{ required: true, msg: '必填' }, { validator: rePasswordValidate }],
};

function rePasswordValidate(password, values) {
  if (values.password !== password) return '两次密码不一致';
}

export default () => {
  function onFinish(values) {
    console.log(values, 'success');
  }

  function onFinishFailed(values) {
    console.log(values, 'fail');
  }

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={initialValues}>
      <Form.Item name="username" label="用户名" rules={rules.username} trigger="onBlur">
        <input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={rules.password}>
        <input />
      </Form.Item>
      <Form.Item name="repassword" label="重复密码" rules={rules.repassword}>
        <input />
      </Form.Item>
      <Form.Item>
        <button>提交</button>
      </Form.Item>
    </Form>
  );
};
```
