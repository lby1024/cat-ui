/**
 * title: 基本使用
 * desc: 基本使用
 */
import { CSSProperties } from 'react';
import { Input } from '../index';

const style: CSSProperties = { width: 300 };
const App = () => {
  return <Input placeholder="base use" style={style} />;
};

export default App;
