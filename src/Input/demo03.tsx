/**
 * title: 三种大小
 * desc: 我为 Input 输入框定义了三种尺寸（大、默认、小），高度分别为 40px、32px 和 24px。
 */
import { CSSProperties } from 'react';
import { Input, Icon } from '../index';

const style: CSSProperties = { width: 300 };

const App = () => {
  const span = <div style={{ height: 12 }}></div>;

  return (
    <>
      <Input prefix={<Icon name="search" />} placeholder="search..." size="large" style={style} />
      {span}
      <Input prefix={<Icon name="search" />} placeholder="search..." style={style} />
      {span}
      <Input prefix={<Icon name="search" />} placeholder="search..." size="small" style={style} />
    </>
  );
};

export default App;
