import RadioItem from './RadioItem';
import RadioGroup from './RadioGroup';
declare type RadioItemType = typeof RadioItem;
interface RadioProps extends RadioItemType {
    Item: typeof RadioItem;
    Group: typeof RadioGroup;
}
declare const Radio: RadioProps;
export default Radio;
