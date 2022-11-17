/**
 */
import { FC } from 'react';
import { Icon } from 'catd';
import styled from 'styled-components';

const Card = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  border-radius: 6px;
  &:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  }
  .name {
    font-size: 12px;
    padding-top: 12px;
  }
`;

const list = [
  { name: 'add' },
  { name: 'camera' },
  { name: 'chart-bar' },
  { name: 'comment' },
  { name: 'chart-pie' },
  { name: 'cry' },
  { name: 'customer-service' },
  { name: 'delete' },
  { name: 'data-view' },
  { name: 'discount' },
  { name: 'electronics' },
  { name: 'film' },
  { name: 'fabulous' },
  { name: 'folder-close' },
  { name: 'filter' },
  { name: 'file-open' },
  { name: 'menu' },
  { name: 'loading' },
  { name: 'notification' },
  { name: 'mic' },
  { name: 'operation' },
  { name: 'picture' },
  { name: 'save' },
  { name: 'search' },
  { name: 'security' },
  { name: 'time' },
  { name: 'telephone-out' },
  { name: 'user' },
  { name: 'arrow-up-bold' },
  { name: 'arrow-down-bold' },
  { name: 'RectangleCopy' },
  { name: 'RectangleCopy1' },
];

const App: FC = () => {
  function copy(name: string) {
    navigator.clipboard.writeText(name);
  }

  return (
    <div>
      {list.map((item) => (
        <Card onClick={() => copy(item.name)}>
          <Icon name={item.name} size="30" />
          <div className="name">{item.name}</div>
        </Card>
      ))}
    </div>
  );
};

export default App;
