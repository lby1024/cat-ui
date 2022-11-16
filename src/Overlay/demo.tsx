/**
 * title: 基本
 * desc: 最简单的用法。
 */
import { Overlay, Button } from 'cat-ui';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
`;
const Trigger = styled.div`
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;
`;

const App = () => {
  const [visible, setVisible] = useState(false);
  const btnRef = useRef(null);

  function trigger(visible: boolean) {
    setVisible(visible);
  }

  return (
    <>
      <Trigger ref={btnRef} onClick={() => trigger(!visible)}>
        click here
      </Trigger>

      <Overlay visible={visible} onVisibleChange={(visible) => trigger(visible)} btnRef={btnRef}>
        <Card>overlay</Card>
      </Overlay>
    </>
  );
};

export default App;
