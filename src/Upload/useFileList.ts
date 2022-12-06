import { useState } from 'react';

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: 'ready' | 'uploading' | 'success' | 'error'; // ready 等待上传
  percent?: number;
  raw?: File; // 源文件
  response?: any;
  error?: any;
}

export function useFileList() {
  const [list, setList] = useState<UploadFile[]>([]);

  function update(file: UploadFile, options: Partial<UploadFile>) {
    return new Promise<UploadFile[]>((resolve) => {
      setList((list) => {
        const newList = list.map((item) => {
          if (item.uid === file.uid) return { ...item, ...options };
          return item;
        });
        resolve(newList);
        return [...newList];
      });
    });
  }

  function add(f: UploadFile) {
    setList((list) => [f, ...list]);
  }

  function dele(f: UploadFile) {
    setList((list) => {
      const newList = list.filter((item) => item.uid !== f.uid);
      return [...newList];
    });
  }

  return { list, update, add, dele, setList };
}
