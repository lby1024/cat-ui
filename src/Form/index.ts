import FormItem from './FormItem';
import FormGroup from './Form';

type FormGroupType = typeof FormGroup;

interface FormProps extends FormGroupType {
  Item: typeof FormItem;
}

const Form = FormGroup as FormProps;
Form.Item = FormItem;

export default Form;
