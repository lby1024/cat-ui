import classNames from 'classnames';
import { FC } from 'react';
import Icon from '../Icon';
import './index.css';

interface AlertProps {
  className?: string;
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
}

const Alert: FC<AlertProps> = (props) => {
  const { className, type, message } = props;

  const clas = classNames('cat-alert', className, {
    [`cat-alert-${type}`]: type,
  });

  const iconMap = {
    success: <Icon size="20" color="#52c41a" name="icon-mianxing_fuzhi_anquanfanghu" />,
    warning: <Icon size="20" color="#faad14" name="icon-mianxing_fuzhi_gaojing" />,
    error: <Icon size="20" color="#ff4d4f" name="icon-mianxing_fuzhi_guanbi" />,
    info: <Icon size="20" color="#1677ff" name="icon-mianxing_fuzhi_xiaoxi" />,
  };

  return (
    <div className={clas}>
      {iconMap[type]}
      <span className="cat-alert-message">{message}</span>
    </div>
  );
};

export default Alert;
