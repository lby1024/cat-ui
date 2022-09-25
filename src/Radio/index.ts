import RadioItem from './RadioItem';
import RadioGroup from './RadioGroup';

type RadioItemType = typeof RadioItem;

interface RadioProps extends RadioItemType {
  Item: typeof RadioItem;
  Group: typeof RadioGroup;
}

const Radio = RadioItem as RadioProps;
Radio.Group = RadioGroup;
Radio.Item = RadioItem;

export default Radio;
