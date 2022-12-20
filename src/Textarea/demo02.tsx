import { Input } from 'catd';

const TextArea = Input.TextArea;

const App = () => {
  return <TextArea placeholder="自动撑高" autoSize={true} />;
};

export default App;
