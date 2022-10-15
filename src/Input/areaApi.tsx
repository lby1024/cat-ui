import { FC } from 'react';

type autoSizeType = { maxRow: number; minRow: number };

interface TextAreaProps {
  /**
   * 自适应内容高度，可设置为 true | false 或对象：{ minRow: 2, maxRow: 6 }
   */
  autoSize?: boolean | autoSizeType;
  /**
   * 是否展示字数
   */
  showCount?: boolean;
}

const api: FC<TextAreaProps> = (props) => <div></div>;

api.defaultProps = {
  autoSize: false,
  showCount: false,
};

export default api;
