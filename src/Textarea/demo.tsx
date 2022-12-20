/**
 */
import { Input } from 'catd';

const TextArea = Input.TextArea;

const App = () => {
  return <TextArea placeholder="显示字数" maxLength={30} showCount />;
};

export default App;
