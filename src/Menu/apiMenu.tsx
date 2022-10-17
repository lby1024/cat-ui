import { CSSProperties, FC, ReactNode } from 'react';

export type MenuModeType = 'inline' | 'vertical' | 'horizon';
export interface MenuProps {
  mode?: MenuModeType;
  inlineIndent?: number; // inline 模式的菜单缩进宽度
  onSelect?: Function;
}

const Api: FC<MenuProps> = (props) => <></>;

Api.defaultProps = {
  inlineIndent: 20,
  mode: 'inline',
};
export default Api;
