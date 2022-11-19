/**
 * title: 基本使用
 * desc: 最简单的用法。
 */
import { Show, Button, Icon } from 'catd';
import { useState } from 'react';

const App = () => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Button onClick={() => setShow(!show)} btnType="primary">
        show: {`${show}`}
      </Button>

      <Show show={show}>
        <Icon name="chart-bar" size="30" color="#1890ff" />
      </Show>
    </>
  );
};

export default App;
