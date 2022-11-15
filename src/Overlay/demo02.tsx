/**
 * title: 指定显示位置
 * desc: 位置有 top | bottom | left | right
 */
import { Overlay, Button } from 'cat-ui';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const Card = styled.div`
  width: 300px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  color: #fff;
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
        trigger top
      </Trigger>

      <Overlay
        visible={visible}
        onVisibleChange={(visible) => trigger(visible)}
        btnRef={btnRef}
        placement="top"
      >
        <Card>overlay</Card>
      </Overlay>
    </>
  );
};

export default App;