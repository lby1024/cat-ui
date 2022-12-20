export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status: 'ready' | 'uploading' | 'success' | 'error'; // ready 等待上传
  percent?: number;
  raw?: File; // 源文件
  response?: any;
  error?: any;
  url?: string;
}
export interface UploadItemProps {
  type: 'success' | 'error' | 'uploading' | 'add';
  file?: UploadFile;
  onRemove?: (file: UploadFile) => void;
  onPreview?: (file: UploadFile) => void;
}

export interface ModalApi {
  show: (file: UploadFile) => void;
}
