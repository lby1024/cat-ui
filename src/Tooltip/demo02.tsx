/**
 * title: 指定显示位置
 * desc: 位置有 top | bottom | left | right
 */
import { Tooltip, Button } from 'catd';

const App = () => {
  return (
    <>
      <Tooltip text="prompt text">
        <Button>top</Button>
      </Tooltip>

      <Tooltip text="prompt text" placement="left">
        <Button>left</Button>
      </Tooltip>

      <Tooltip text="prompt text" placement="right">
        <Button>right</Button>
      </Tooltip>

      <Tooltip text="prompt text" placement="bottom">
        <Button>bottom</Button>
      </Tooltip>
    </>
  );
};

export default App;
