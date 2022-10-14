/**
 * title: 前置/后置标签
 * desc: 用于配置一些固定组合。
 */
import { CSSProperties } from 'react';
import { Input, Icon } from '../index';

const style: CSSProperties = { width: 300 };

const App = () => {
  return (
    <>
      <Input addOnBeefore="http://" addOnAfter=".com" defaultValue="cat-ui" style={style} />
      <br />
      <br />
      <Input
        addOnBeefore="https://"
        addOnAfter={<Icon name="search" />}
        defaultValue="cat-ui"
        maxLength={10}
        style={style}
      />
      <br />
      <br />
      <Input
        style={style}
        suffix={<Icon name="mic" />}
        addOnAfter={<Icon name="search" />}
        placeholder="placeholder..."
      />
      <br />
      <br />
      <Input prefix="http://" defaultValue="cat-ui" suffix=".com" style={style} />
      <br />
      <br />
      <Input
        prefix={<Icon name="RectangleCopy1" size="21" />}
        placeholder="user name"
        suffix="x"
        style={style}
      />
    </>
  );
};

export default App;
