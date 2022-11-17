/**
 * title: TextArea
 * desc: 可自动撑高, 设置最大行最小行
 */
import { Input } from 'catd';

const TextArea = Input.TextArea;

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
