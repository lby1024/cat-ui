import { Form, Input, Button } from 'catd';

const initialValues = {
  username: 'jack',
};

const rules = {
  username: [{ required: true, min: 3, max: 6 }],
  password: [
    { required: true, msg: '必填' },
    { min: 6, msg: '密码太短了' },
    { max: 12, msg: '密码太长了' },
  ],
};

export default () => {
  function onFinish(values: any) {
    console.log(values, 'success');
  }

  function onFinishFailed(values: any) {
    console.log(values, 'fail');
  }

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
      style={{ width: 600 }}
    >
      <Form.Item name="username" label="用户名" rules={rules.username} trigger="onBlur">
        <Input placeholder="username" />
      </Form.Item>

      <Form.Item name="password" label="密码" rules={rules.password}>
        <Input placeholder="password" />
      </Form.Item>

      <Form.Item>
        <Button>提交</Button>
      </Form.Item>
    </Form>
  );
};
