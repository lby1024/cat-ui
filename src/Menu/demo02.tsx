/**
 * title: 基础
 * desc: 最简单的用法。
 */

import { Menu } from 'cat-ui';

type DataType = {
  label: string;
  name?: string;
  mode?: 'inline' | 'vertical' | 'horizon';
  children?: DataType[];
};

const data: DataType[] = [
  {
    label: 'Navigation One',
    children: [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3' },
      { label: 'Option 4' },
    ],
  },
  {
    label: 'Navigation Two',
    children: [
      { label: 'Option 5' },
      { label: 'Option 6' },
      {
        label: 'SubMenu',
        mode: 'vertical',
        children: [{ label: 'Option 7' }, { label: 'Option 8' }],
      },
    ],
  },
  {
    label: 'Navigation Three',
    children: [
      { label: 'Option 9' },
      { label: 'Option 10' },
      { label: 'Option 11' },
      { label: 'Option 12' },
    ],
  },
];

const App = () => {
  function onSelect(res: any) {
    console.log(res);
  }

  function render(someOne: DataType) {
    if (someOne.children) {
      return (
        <Menu.Sub title={someOne.label} mode={someOne.mode} key={someOne.label} name={someOne.name}>
          {someOne.children.map((item) => render(item))}
        </Menu.Sub>
      );
    }
    return (
      <Menu.Item name={someOne.name} key={someOne.label}>
        {someOne.label}
      </Menu.Item>
    );
  }

  return (
    // <Menu onSelect={onSelect} mode="horizon">
    // <Menu style={{ width: 250 }} onSelect={onSelect} mode="inline">
    <Menu style={{ width: 250 }} onSelect={onSelect} mode="vertical">
      {data.map((child) => render(child))}
    </Menu>
  );
};

export default App;
