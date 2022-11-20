import classNames from 'classnames';
import { FC } from 'react';
import Alert from '../Alert';
import './index.css';

interface MessageListProps {
  className?: string;
}

const MessageList: FC<MessageListProps> = (props) => {
  const { className } = props;

  const clas = classNames('cat-message-list', className, {});

  return (
    <div className={clas}>
      <Alert message="Detailed description and advice about successful copywriting." type="error" />
      <Alert message="Detailed description and advice about successful copywriting." type="info" />
      <Alert
        message="Detailed description and advice about successful copywriting."
        type="success"
      />
      <Alert
        message="Detailed description and advice about successful copywriting."
        type="warning"
      />
    </div>
  );
};

export default MessageList;
