import InputInner from './Input';
import TextArea from './Textarea';

type InputInnerProps = typeof InputInner;

interface FormProps extends InputInnerProps {
  TextArea: typeof TextArea;
}

const Input = InputInner as FormProps;
Input.TextArea = TextArea;

export default Input;
