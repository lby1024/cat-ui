/**
 * title: horizon
 * desc: mode="horizon"
 */

import { Menu } from 'catd';

const App = () => {
  function onSelect(res: any) {
    console.log(res);
  }

  return (
    <Menu style={{ width: 'auto' }} onSelect={onSelect} mode="horizon">
      <Menu.Item>布局</Menu.Item>
      <Menu.Sub title="Navigation Two - Submenu">
        <Menu.Item>Navigation One</Menu.Item>
        <Menu.Item>Navigation Two</Menu.Item>
        <Menu.Sub title="Submenu">
          <Menu.Item>Navigation One</Menu.Item>
          <Menu.Item>Navigation Two</Menu.Item>
        </Menu.Sub>
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
