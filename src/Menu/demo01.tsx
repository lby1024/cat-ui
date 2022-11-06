/**
 * title: 通用
 * desc: 最简单的用法。
 */

import { Menu } from 'cat-ui';

const App = () => {
  function onSelect(res: any) {
    console.log(res);
  }

  return (
    // <Menu style={{ width: 'auto' }} onSelect={onSelect} mode="horizon">
    // <Menu style={{ width: 250 }} onSelect={onSelect} mode="vertical">
    <Menu style={{ width: 250 }} onSelect={onSelect} mode="inline">
      <Menu.Item>quick start</Menu.Item>
      <Menu.Sub title="布局">
        <Menu.Item>divider</Menu.Item>
        <Menu.Item>grid</Menu.Item>
      </Menu.Sub>
      <Menu.Sub title="通用">
        <Menu.Item>button</Menu.Item>
        <Menu.Item>icon</Menu.Item>
      </Menu.Sub>
      <Menu.Item>其他</Menu.Item>
    </Menu>
  );
};

export default App;
