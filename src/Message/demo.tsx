/**
 * title: 通用
 * desc: 最简单的用法。
 */

import { Message, Button } from 'catd';
import MessageList from './MessageList';

const App = () => {
  return (
    <div>
      <MessageList />
      <Button>message</Button>
    </div>
  );
};

export default App;
