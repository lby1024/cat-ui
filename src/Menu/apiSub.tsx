import classNames from 'classnames';
import React, { useContext, useRef, useState } from 'react';
import { FC, ReactNode } from 'react';
import Icon from '../Icon';
import { MenuModeType } from './MenuGroup';
import { MenuContext } from './useMenu';

export interface SubMenuProps {
  title?: string;
  name?: string;
  mode?: MenuModeType;
}

const api: FC<SubMenuProps> = (props) => <></>;

api.defaultProps = {
  mode: 'inline',
};
export default api;
