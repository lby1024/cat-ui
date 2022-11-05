import { FC, ReactElement } from 'react';
import { AutoItemType } from './AutoComplete';

interface AutoInputProps {
  /**
   * 是否禁用状态
   */
  disabled?: boolean;
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
  /**
   * 搜索补全项的时候调用
   */
  onSearch: (str: string) => AutoItemType[] | Promise<AutoItemType[]>;
  /**
   * 被选中时调用，参数为选中项的 value 值
   */
  onSelect?: (item: AutoItemType) => void;
  /**
   * 自定义选项
   */
  renderItem?: (item: AutoItemType) => ReactElement;
}

const api: FC<AutoInputProps> = (props) => <div></div>;

export default api;
