/**
 * title: vertical
 * desc: mode="vertical"
 */

import { Menu } from 'catd';

const App = () => {
  function onSelect(res: any) {
    console.log(res);
  }

  return (
    <Menu style={{ width: 250 }} onSelect={onSelect} mode="vertical">
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
