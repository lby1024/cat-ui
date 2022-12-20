import { Form, Input, Button } from 'catd';

const rules = {
  username: [{ required: true, min: 3, max: 6 }],
  password: [
    { required: true, msg: '必填' },
    { min: 6, msg: '密码太短了' },
    { max: 12, msg: '密码太长了' },
  ],
  repassword: [{ required: true, msg: '必填' }, { validator: rePasswordValidate }],
};

function rePasswordValidate(password: any, values: any) {
  if (values.password !== password) return '两次密码不一致';
}

export default () => {
  function onFinish(values: any) {
    console.log(values, 'success');
  }

  function onFinishFailed(values: any) {
    console.log(values, 'fail');
  }

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed} style={{ width: 800 }}>
      <Form.Item name="username" label="用户名" rules={rules.username}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={rules.password}>
        <Input />
      </Form.Item>
      <Form.Item name="repassword" label="重复密码" rules={rules.repassword}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button>提交</Button>
      </Form.Item>
    </Form>
  );
};
