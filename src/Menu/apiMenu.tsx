import { CSSProperties, FC, ReactNode } from 'react';

export type MenuModeType = 'inline' | 'vertical' | 'horizon';
export interface MenuProps {
  /**
   * 'inline' | 'vertical' | 'horizon'
   */
  mode?: MenuModeType;
  /**
   * inline 模式的菜单缩进宽度
   */
  inlineIndent?: number;
  /**
   * 被选中时调用
   */
  onSelect?: Function;
}

const Api: FC<MenuProps> = (props) => <></>;

Api.defaultProps = {
  inlineIndent: 20,
  mode: 'inline',
};
export default Api;
