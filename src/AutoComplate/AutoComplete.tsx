import classNames from 'classnames';
import { ChangeEvent, FC, ReactElement, useRef, useState } from 'react';
import Input, { InputProps } from '../Input';
import { useClickOut, useDebounceFn } from '../tools/hooks';
import './index.css';

enum keyCode {
  down = 38,
  up = 40,
  esc = 27,
  enter = 13,
}

export type AutoItemType<T = {}> = {
  value: string;
} & T;

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  className?: string;
  onSearch: (str: string) => AutoItemType[] | Promise<AutoItemType[]>;
  onSelect?: (item: AutoItemType) => void;
  renderItem?: (item: AutoItemType) => ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { className, onSearch, onSelect, value, renderItem, style, ...restProps } = props;
  const [v, setV] = useState(value || '');
  const [list, setList] = useState<AutoItemType[]>([]);
  const [cur, setCur] = useState(-1); // listItem 高亮
  const clas = classNames('cat-auto-complete', className);
  const componentRef = useRef(null);
  useClickOut(componentRef, () => setList([])); // 点击外面区域隐藏提示列表
  /**
   * 根据value显示list
   */
  const fetchSuggest = useDebounceFn((v: string) => {
    if (!v) {
      setList([]);
      return;
    }
    const res = onSearch(v);
    if (res instanceof Promise) {
      res.then((result) => setList(result));
    } else {
      setList(res);
    }
  });

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setV(value);
    fetchSuggest(value);
  }

  function select(item: AutoItemType) {
    if (!item) return;
    setList([]);
    setV(item.value);
    onSelect?.(item);
  }

  function heighLight(index: number) {
    if (index < 0) index = 0;
    if (index >= list.length) index = list.length - 1;
    setCur(index);
  }

  const onKeyDown = (e: any) => {
    const code = e.keyCode;
    if (code === keyCode.down) heighLight(cur - 1);
    if (code === keyCode.up) heighLight(cur + 1);
    if (code === keyCode.esc) setList([]);
    if (code === keyCode.enter) select(list[cur]);
  };

  function itemClass(index: number) {
    return classNames('cat-auto-li', {
      'cat-auto-cur': cur === index,
    });
  }

  function ListItem(item: AutoItemType) {
    return renderItem ? renderItem(item) : item.value;
  }

  const List = () => (
    <ul className="cat-auto-ul">
      {list.map((item, index) => (
        <li onClick={() => select(item)} className={itemClass(index)} key={index}>
          {ListItem(item)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={clas} style={style} ref={componentRef}>
      <Input value={v} onChange={onChange} onKeyDown={onKeyDown} {...restProps} />
      {list.length > 0 && List()}
    </div>
  );
};

export default AutoComplete;
