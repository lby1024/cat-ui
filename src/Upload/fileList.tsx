import { FC } from 'react';
import { UploadFile } from './useFileList';

interface FileListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

const FileList: FC<FileListProps> = (props) => {
  const { fileList, onRemove } = props;

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
