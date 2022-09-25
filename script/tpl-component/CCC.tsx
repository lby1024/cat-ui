import classNames from 'classnames';
import React, { FC } from 'react';
import './index.css';

interface CCCProps {
  className?: string;
}

const CCC: FC<CCCProps> = (props) => {
  const { className } = props;

  const clas = classNames({
    'cat-ccc': true,
    [className as string]: !!className,
  });

  return <div>CCC</div>;
};

export default CCC;
