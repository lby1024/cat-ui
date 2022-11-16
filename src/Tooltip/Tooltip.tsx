import classNames from 'classnames';
import { FC } from 'react';
import './index.css';

interface TooltipProps {
  className?: string;
}

const Tooltip: FC<TooltipProps> = (props) => {
  const { className } = props;

  const clas = classNames('cat-tooltip', className, {});

  return <div>Tooltip</div>;
};

export default Tooltip;
