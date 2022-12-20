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

      <Show show={show} duration={1000}>
        <Icon name="cat1" size="300" color="#1890ff" />
      </Show>
    </>
  );
};

export default App;
