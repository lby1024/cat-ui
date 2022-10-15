import { FC } from 'react';

interface ButtonProps {
  /**
   * 按钮失效状态
   */
  disabled?: boolean;
  /**
   * 设置按钮大小
   */
  size?: 'lg' | 'sm';
  /**
   * 设置按钮类型
   */
  btnType?: 'primary' | 'default' | 'danger' | 'link';
}

const api: FC<ButtonProps> = (props) => <div></div>;

api.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default api;
