import { FC } from 'react';
import { UploadFile } from '../interface';

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (file: UploadFile) => void;
}

const UploadList: FC<UploadListProps> = (props) => {
  const { fileList, onRemove } = props;

  const Card = <div></div>;

  return (
    <ul>
      {fileList.map((file) => (
        <li>
          <span>{file.name}------</span>
          <span>{file.status}------</span>
          <span>{file.percent}</span>
        </li>
      ))}
    </ul>
  );
};

export default UploadList;
