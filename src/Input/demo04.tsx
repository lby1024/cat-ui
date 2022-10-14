/**
 * title: TextArea
 * desc: 可自动撑高, 设置最大行最小行
 */
import { CSSProperties } from 'react';
import {} from '../index';
import TextArea from './Textarea';

const style: CSSProperties = { width: 300 };

const App = () => {
  return (
    <>
      <TextArea placeholder="显示字数" maxLength={30} showCount />
      <br />
      <br />
      <br />
      <TextArea placeholder="自动撑高" maxLength={30} autoSize={true} />
      <br />
      <br />
      <br />
      <TextArea
        placeholder="最小5行, 最大7行"
        showCount={true}
        maxLength={30}
        autoSize={{ minRow: 5, maxRow: 7 }}
      />
    </>
  );
};

export default App;
