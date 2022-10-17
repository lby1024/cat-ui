import classNames from 'classnames';
import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import Input, { InputProps } from '../Input';
import { useDebounce } from '../tools/hooks';
import './index.css';

type AutoCompleteIitem = {
  value: string;
};

export type AutoItemType<T = {}> = AutoCompleteIitem & T;

interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  className?: string;
  fetchSuggestions: (str: string) => AutoItemType[] | Promise<AutoItemType[]>;
  onSelect?: (item: AutoItemType) => void;
  renderItem?: (item: AutoItemType) => ReactElement;
}

const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { className, fetchSuggestions, onSelect, value, renderItem, style, ...restProps } = props;
  const [v, setV] = useState(value);
  const [list, setSugestions] = useState<AutoItemType[]>([]);
  const clas = classNames('cat-auto-complete', className);
  const debounceValue = useDebounce(v);

  useEffect(() => {
    if (!debounceValue) {
      setSugestions([]);
      return;
    }
    const res = fetchSuggestions(debounceValue);
    if (res instanceof Promise) {
      res.then((result) => setSugestions(result));
    } else {
      setSugestions(res);
    }
  }, [debounceValue]);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setV(value);
  }

  function select(item: AutoItemType) {
    setV(item.value);
    setSugestions([]);
    onSelect?.(item);
  }

  const ListItem = (item: AutoItemType) => {
    return renderItem ? renderItem(item) : item.value;
  };

  const List = () => (
    <ul className="cat-auto-ul">
      {list.map((item, index) => (
        <li key={index} onClick={() => select(item)} className="cat-auto-li">
          {ListItem(item)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={clas} style={style}>
      <Input value={value} onChange={onChange} {...restProps} />
      {list.length > 0 && List()}
    </div>
  );
};

export default AutoComplete;
