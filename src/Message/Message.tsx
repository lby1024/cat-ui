import classNames from 'classnames';
import { FC } from 'react';
import './index.css';

interface MessageProps {
  className?: string;
}

const Message: FC<MessageProps> = (props) => {
  const { className } = props;

  const clas = classNames('cat-message', className, {});

  return <div>Message</div>;
};

export default Message;
