import { useState } from 'react';
import { UploadFile } from '../interface';

export function useFileList(defaultFiles: UploadFile[]) {
  const [list, setList] = useState<UploadFile[]>(defaultFiles);

  const add = (f: UploadFile) =>
    new Promise((resolve) => {
      setList((list) => {
        resolve([f, ...list]);
        return [f, ...list];
      });
    });

  const update = (file: UploadFile, options: Partial<UploadFile>) =>
    new Promise<UploadFile[]>((resolve) => {
      setList((list) => {
        const newList = list.map((item) => {
          if (item.uid === file.uid) return { ...item, ...options };
          return item;
        });
        resolve(newList);
        return [...newList];
      });
    });

  const dele = (f: UploadFile) =>
    new Promise((resolve) => {
      setList((list) => {
        const newList = list.filter((item) => item.uid !== f.uid);
        resolve(newList);
        return [...newList];
      });
    });

  return { list, update, add, dele, setList };
}
