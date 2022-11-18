/**
 * title: 点击触发
 * desc: 触发方式有 hover | click
 */
import { Popup, Button } from 'catd';
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

const App = () => {
  return (
    <Popup overLay={<Card>message</Card>} event="click" placement="top">
      <Button>click</Button>
    </Popup>
  );
};

export default App;
