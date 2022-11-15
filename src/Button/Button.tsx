import classNames from 'classnames';
import React, { FC, forwardRef } from 'react';
import './index.css';

type nativeProps = React.ButtonHTMLAttributes<HTMLElement> &
  React.AnchorHTMLAttributes<HTMLElement>;

interface ButtonProps extends Partial<nativeProps> {
  className?: string;
  disabled?: boolean;
  size?: 'lg' | 'sm';
  btnType?: 'primary' | 'default' | 'danger' | 'link';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { className, size, disabled, btnType, children, href, ...others } = props;

  const clas = classNames('cat-button', {
    [`cat-btn-${btnType}`]: btnType,
    [`cat-btn-${size}`]: size,
    'cat-btn-disabled': disabled,
    [className as string]: !!className,
  });

  if (btnType === 'link') {
    return (
      <a className={clas} href={href} {...others}>
        {children}
      </a>
    );
  }

  return (
    <button className={clas} disabled={disabled} {...others} ref={ref}>
      {children}
    </button>
  );
});

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
