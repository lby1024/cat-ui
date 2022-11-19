import classNames from 'classnames';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { CSSProperties } from 'styled-components';
import './index.css';

interface ShowProps {
  /**
   * 显示隐藏
   */
  show: boolean;
  /**
   * 动画时间
   */
  duration?: number;
  display?: 'block' | 'inline-block';
  children: ReactNode;
}

const Show: FC<ShowProps> = (props) => {
  const { show, children, duration = 300, display = 'block' } = props;
  const [visible, setVisible] = useState(show);
  const timer = useRef<any>(null);

  const clas = classNames({
    'cat-show': show,
    'cat-hide': !show,
  });

  useEffect(() => {
    show ? setVisible(show) : hide();
    return () => clearTimeout(timer.current);
  }, [show]);

  function hide() {
    timer.current = setTimeout(() => setVisible(show), duration);
  }

  const style: CSSProperties = {
    animationDuration: `${duration / 1000}s`,
    display,
  };

  if (!visible) return null;
  return (
    <div className={clas} style={style}>
      {children}
    </div>
  );
};

Show.defaultProps = {
  duration: 300,
  display: 'block',
};

export default Show;
