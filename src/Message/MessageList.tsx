import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import Alert from '../Alert';
import './index.css';

function MessageList() {
  const [msgList, setList] = useState<MsgItemProps[]>([]);

  MessageList.add = (newMsg: MsgItemProps) => {
    const now = new Date().getTime();
    const arr = msgList.filter(({ time, duration }) => now - time < duration);
    newMsg.duration += arr.length * 200; // 优化快速点击, 依次消失的动画效果
    setList([...arr, newMsg]);
  };

  const List = msgList.map((msgItemProps) => <MsgItem {...msgItemProps} key={msgItemProps.time} />);
  return <div className="cat-message-list">{List}</div>;
}
MessageList.add = (item: MsgItemProps) => {};
export default MessageList;

interface MsgItemProps {
  msg: string;
  type: 'success' | 'warning' | 'error' | 'info';
  duration: number;
  time: number;
}

const MsgItem: FC<MsgItemProps> = (props) => {
  const { type, msg, duration } = props;
  const [show, setShow] = useState(true);

  const clas = classNames('cat-msg-item', {
    'cat-msg-show': show,
    'cat-msg-hide': !show,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={clas}>
      <Alert type={type} message={msg} />
    </div>
  );
};
