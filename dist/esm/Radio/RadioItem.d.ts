import { FC, ReactNode } from 'react';
import './index.css';
interface RadioItemProps {
    className?: string;
    checked?: boolean;
    disabled?: boolean;
    value?: string;
    onChange?: (e: string) => void;
    children?: ReactNode;
}
declare const RadioItem: FC<RadioItemProps>;
export default RadioItem;
