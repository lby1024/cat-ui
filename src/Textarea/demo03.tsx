import { Input } from 'catd';

const TextArea = Input.TextArea;

const App = () => {
  return (
    <TextArea
      placeholder="最小3行, 最大7行"
      showCount={true}
      maxLength={30}
      autoSize={{ minRow: 3, maxRow: 7 }}
    />
  );
};

export default App;
