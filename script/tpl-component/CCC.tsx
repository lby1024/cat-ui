import classNames from 'classnames';
import { FC } from 'react';
import './index.css';

interface CCCProps {
  className?: string;
}

const CCC: FC<CCCProps> = (props) => {
  const { className } = props;

  const clas = classNames('cat-ccc', className, {});

  return <div>CCC</div>;
};

export default CCC;
