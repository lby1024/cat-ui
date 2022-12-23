import classNames from 'classnames';
import { ChangeEvent, FC, useRef } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import { useFileList } from './useFileList';
import { ModalApi, UploadFile, UploadItemProps } from '../interface';
import UploadItem from './UploadItem';
import './index.css';
import Modal from './Modal';

export interface UploadProps {
  className?: string;
  /**
   * 上传的地址
   */
  action: string;
  /**
   * 默认已经上传的文件列表
   */
  defaultFiles?: UploadFile[];
  /**
   * 上传文件改变时的回调
   */
  onChange?: (files: UploadFile[]) => void;
  /**
   * 上传成功的回调
   */
  onSuccess?: (data: any, file: File) => void;
  /**
   * 上传失败的回调
   */
  onError?: (err: any, file: File) => void;
  /**
   * 文件开始上传前的回调
   */
  beforeUpload?: (rawFile: File) => boolean | Promise<File>;
  /**
   * 删除文件的回调
   */
  onRemove?: (file: UploadFile) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const { className, action, defaultFiles, onChange, beforeUpload, onSuccess, onError, onRemove } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);
  const clas = classNames('cat-upload', className);
  const files = useFileList(defaultFiles || []);
  const modalRef = useRef<ModalApi>(null);

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
   * 删除图片
   */
  function remove(file: UploadFile) {
    files.dele(file);
    if (onRemove) {
      onRemove(file);
    }
  }

  /**
   * 预览图片
   */
  function preview(file: UploadFile) {
    modalRef.current?.show(file);
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

  const List = files.list.map((file) => {
    return (
      <UploadItem
        type={file.status as UploadItemProps['type']}
        file={file}
        key={file.uid}
        onRemove={remove}
        onPreview={preview}
      />
    );
  });

  return (
    <div className={clas}>
      <div onClick={click} style={{ display: 'inline-block' }}>
        <UploadItem type="add" />
      </div>
      {List}
      <input className="cat-upload-input" type="file" ref={inputRef} onChange={inputChange} />
      <Modal ref={modalRef} />
    </div>
  );
};

export default Upload;
