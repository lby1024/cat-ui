import { FC, ReactElement } from 'react';

interface InputProps {
  /**
   * 控件大小
   */
  size?: 'large' | 'small' | 'default';
  /**
   * 带标签的 input，设置后置标签
   */
  addOnBeefore?: string | ReactElement;
  /**
   * 带标签的 input，设置前置标签
   */
  addOnAfter?: string | ReactElement;
  /**
   * 带有前缀图标的 input
   */
  prefix?: string | ReactElement;
  /**
   * 带有后缀图标的 input
   */
  suffix?: string | ReactElement;
}

const api: FC<InputProps> = (props) => <div></div>;

export default api;
