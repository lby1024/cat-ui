import classNames from 'classnames';
import {
  ChangeEvent,
  FC,
  TextareaHTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useMounted } from '../tools/hooks';

type autoSizeType = { maxRow: number; minRow: number };

type NativeInputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
interface TextAreaProps extends NativeInputProps {
  className?: string;
  autoSize?: boolean | autoSizeType;
  showCount?: boolean;
  value?: string;
  defaultValue?: string;
}

const TextArea: FC<TextAreaProps> = (props) => {
  const { className, autoSize, showCount, style, ...nativAreaProps } = props;
  const { maxLength } = nativAreaProps;
  const [value, onChange] = useBind(props);
  const { areaRef, fakeRef, style: areaStyle } = useAutoSize(props, value);

  const clas = classNames('cat-textarea', className, {
    'cat-textarea-count': showCount,
  });

  return (
    <span className={clas} data-count={`${value.length}/${maxLength}`} style={style}>
      <textarea
        {...nativAreaProps}
        value={value}
        onChange={onChange}
        ref={areaRef}
        style={areaStyle}
      />
      {/* 这个要隐藏起来 */}
      <textarea className="cat-area-fake" ref={fakeRef} />
    </span>
  );
};

export default TextArea;

/**
 * 和 props.value 双向绑定
 * 和 textarea.value 双向绑定
 */
function useBind(props: TextAreaProps) {
  const { defaultValue, value: pv, onChange } = props;
  const [value, setV] = useState(defaultValue || pv || '');

  useEffect(() => {
    if ('value' in props) {
      if (pv === undefined) setV('');
      else setV(pv);
    }
  }, [pv]);

  function onInput(e: ChangeEvent<HTMLTextAreaElement>) {
    if (!('value' in props)) {
      setV(e.target.value);
    }
    onChange?.(e);
  }

  return [value, onInput] as const;
}

/**
 * <textarea /> autoSize 功能
 */
function useAutoSize(props: TextAreaProps, value: string) {
  const { autoSize } = props;
  const areaRef = useRef<any>(null);
  const fakeRef = useRef<any>(null);

  // 最小高度&最大高度
  useMounted(() => {
    if (typeof autoSize === 'object') {
      const { minRow, maxRow } = autoSize;
      const fakeNode = fakeRef.current;
      fakeNode.setAttribute('rows', minRow);
      const minHeight = fakeNode.clientHeight;

      fakeNode.setAttribute('rows', maxRow);
      const maxHeight = fakeNode.clientHeight;

      areaRef.current.setAttribute(
        'style',
        `min-height: ${minHeight}px; max-height: ${maxHeight}px;`,
      );

      fakeNode.setAttribute('rows', 1);
    }
  });

  // 自动撑高
  const style = useMemo(() => {
    const fakeNode = fakeRef.current;
    const areaNode = areaRef.current;

    if (!props.autoSize) {
      return {};
    }

    if (fakeNode && areaNode) {
      fakeNode.value = value;
      const height: number = fakeNode.scrollHeight;
      return { height };
    }
    return {};
  }, [value]);

  return {
    style,
    areaRef,
    fakeRef,
  };
}
