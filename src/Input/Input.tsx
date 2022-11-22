import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes, ReactElement } from 'react';
import './index.css';

type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;
export interface InputProps extends Omit<NativeInputProps, 'size' | 'prefix'> {
  className?: string;
  size?: 'large' | 'small' | 'default';
  addOnBefore?: string | ReactElement;
  addOnAfter?: string | ReactElement;
  prefix?: string | ReactElement;
  suffix?: string | ReactElement;
}

const Input = forwardRef<HTMLElement, InputProps>((props, ref) => {
  const { className, size, addOnBefore, addOnAfter, suffix, prefix, style, ...others } = props;

  const clas = classNames('cat-input', className, {
    [`cat-input-${size}`]: size,
  });

  const Before = <span className="cat-input-label cat-input-before">{addOnBefore}</span>;
  const After = <span className="cat-input-label cat-input-after">{addOnAfter}</span>;
  const Prefix = <span className="cat-input-fix cat-input-prefix">{prefix}</span>;
  const Suffix = <span className="cat-input-fix cat-input-suffix">{suffix}</span>;

  return (
    <span className={clas} style={style} ref={ref}>
      {addOnBefore && Before}
      <span className="cat-input-mid">
        {prefix && Prefix}
        <input {...others} />
        {suffix && Suffix}
      </span>
      {addOnAfter && After}
    </span>
  );
});

export default Input;
