import classNames from 'classnames';
import React, { FC } from 'react';
import './index.css';

interface MenuProps {
  className?: string;
}

const Menu: FC<MenuProps> = (props) => {
  const { className } = props;

  const clas = classNames({
    'cat-menu': true,
    [className as string]: !!className,
  });

  return <div>Menu</div>;
};

export default Menu;
