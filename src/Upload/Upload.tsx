import classNames from 'classnames';
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import Button from '../Button';
import axios, { AxiosProgressEvent } from 'axios';
import { UploadFile, useFileList } from './useFileList';
import './index.css';

export interface UploadProps {
  className?: string;
  action: string;
  defaultFiles?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (rawFile: File) => boolean | Promise<File>;
}

const Upload: FC<UploadProps> = (props) => {
  const { className, action, defaultFiles, onChange, beforeUpload, onSuccess, onError } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const clas = classNames('cat-upload', className, {});
  const files = useFileList();

  const click = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (inputRef.current) inputRef.current.value = '';
  };

  const uploadFiles = (files: FileList) => {
    Array.from(files).forEach(async (rawFile) => {
      rawFile = await check(rawFile);
      uploadFile(rawFile);
    });
  };

  /**
   * 处理beforeUpload的返回值
   * beforeUpload作用:
   * 1,可用来检查文件大小 (返回 boolean)
   * 2,修改文件名 (返回 promise)
   */
  function check(rawFile: File): Promise<File> {
    return new Promise((resolve) => {
      if (!beforeUpload) {
        resolve(rawFile);
        return;
      }
      const can = beforeUpload(rawFile);
      if (can instanceof Promise) {
        can.then((rawFile) => resolve(rawFile));
      }
      if (can === true) {
        resolve(rawFile);
      }
    });
  }

  /**
   * 使用axios上传文件
   * 调用回调函数 onProgress
   * 更新 files.list
   * 上传后根据情况执行 onSuccess, onChange, onError
   */
  function uploadFile(rawFile: File) {
    let file: UploadFile = {
      uid: Date.now() + 'file',
      status: 'ready',
      name: rawFile.name,
      size: rawFile.size,
      percent: 0,
      raw: rawFile,
    };
    files.add(file);
    const formData = new FormData();
    formData.append(rawFile.name, rawFile);
    axios
      .post(action, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      })
      .then(async (res) => {
        const fileList = await files.update(file, { status: 'success' });
        onChange && onChange(fileList);
        onSuccess && onSuccess(res.data, rawFile);
      })
      .catch(async (err) => {
        const fileList = await files.update(file, { status: 'error', percent: 0 });
        onChange && onChange(fileList);
        onError && onError(err, rawFile);
      });

    function onUploadProgress(e: AxiosProgressEvent) {
      if (!e.total) return;
      let percent = (e.loaded * 100) / e.total;
      percent = Math.round(percent);
      files.update(file, {
        status: 'uploading',
        percent,
      });
    }
  }

  return (
    <div className={clas}>
      <div onClick={click}>
        <Button btnType="primary">Upload File</Button>
      </div>
      <input className="cat-upload-input" type="file" ref={inputRef} onChange={inputChange} />
      {files.list.map((file) => (
        <div key={file.uid}>
          {file.name}-{file.status}-{file.percent}
        </div>
      ))}
    </div>
  );
};

export default Upload;
