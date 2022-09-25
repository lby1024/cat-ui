import { FC, ReactElement } from 'react';
interface radioGroupProps {
    value?: string;
    children?: ReactElement;
    onChange?: (v: string) => void;
}
declare const RadioGroup: FC<radioGroupProps>;
export default RadioGroup;
