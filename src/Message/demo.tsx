/**
 * title: 通用
 * desc: 最简单的用法。
 */

import { Message, Button } from 'catd';

const App = () => {
  const success = () => Message.success('MessageList' + new Date().getTime());
  const error = () => Message.error('MessageList' + new Date().getTime());
  const warning = () => Message.warning('MessageList' + new Date().getTime());
  const info = () => Message.info('MessageList' + new Date().getTime());

  return (
    <div>
      <Button onClick={info} btnType="primary">
        info
      </Button>

      <Button onClick={success}>success</Button>

      <Button onClick={error} btnType="danger">
        error
      </Button>

      <Button onClick={warning}>waring</Button>
    </div>
  );
};

export default App;
