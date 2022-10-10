/**
 * title: 基础
 * desc: 最简单的用法。
 */

import { Menu } from '../index';

const Demo01 = () => {
  function onSelect(res: any) {
    console.log(res);
  }

  const style = { width: 250, height: '30vh' };

  return (
    <Menu onSelect={onSelect} style={style} mode="vertical">
      <Menu.Item>首页</Menu.Item>
      <Menu.Sub title="成员">
        <Menu.Item>老板</Menu.Item>
        <Menu.Sub title="店长">
          <Menu.Item>小张</Menu.Item>
          <Menu.Item>小赵</Menu.Item>
        </Menu.Sub>
      </Menu.Sub>
      <Menu.Item>资金</Menu.Item>
    </Menu>
  );
};

export default Demo01;
