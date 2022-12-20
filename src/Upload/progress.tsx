import classNames from 'classnames';
import { FC, useEffect, useState } from 'react';
import { useDebounce } from '../tools/hooks';
import styled from 'styled-components';

interface ProgressProps {
  className?: string;
  percent?: number;
}

const Progress: FC<ProgressProps> = (props) => {
  const { className, percent } = props;
  const per = usePercent(percent || 0);
  const clas = classNames('cat-progress', className);

  return <Div className={clas} percent={per} />;
};

export default Progress;

/**
 * 让动画变得自然
 */
function usePercent(percent: number) {
  const [p, setP] = useState(0);
  const per = useDebounce(p, 10);

  useEffect(() => {
    if (percent) setP(percent);
  }, [percent]);

  return per;
}

var Div = styled.div<{
  percent: number;
}>`
  width: 100%;
  height: 3px;
  background-color: #d9d9d9;
  ::after {
    content: '';
    display: block;
    height: 100%;
    width: ${(props) => props.percent}%;
    background-color: var(--blue);
    border-radius: 10px;
    transition: all 1s;
  }
`;
