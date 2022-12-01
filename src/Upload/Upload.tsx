import classNames from 'classnames';
import { FC } from 'react';
import './index.css';

interface UploadProps {
  className?: string;
}

const Upload: FC<UploadProps> = (props) => {
  const { className } = props;

  const clas = classNames('cat-upload', className, {});

  return <div>Upload</div>;
};

export default Upload;
