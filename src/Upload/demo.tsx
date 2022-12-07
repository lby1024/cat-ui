/**
 * title: 通用
 * desc: 最简单的用法。
 */

import { Upload, UploadFile } from 'catd';

const App = () => {
  function onSuccess(data: any, file: File) {
    console.log('onSuccess', data, file);
  }

  function onError(error: Error, file: File) {
    console.log('onError', error, file);
  }

  function onChange(file: any[]) {
    console.log('onChange', file);
  }

  function check(file: File) {
    if (file.size > 198993) {
      alert('too big');
      return false;
    }
    return true;
  }

  function rename(file: File) {
    return new Promise<File>((reso) => {
      const f = new File([file, file], `f-${Date.now()}`, { type: file.type });
      reso(f);
    });
  }

  const defaultFiles: UploadFile[] = [
    {
      uid: 'f1',
      status: 'success',
      size: 99999,
      name: 'f1.jpg',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      percent: 100,
    },
    {
      uid: 'f2',
      status: 'error',
      size: 99999,
      name: 'f2.jpg',
      percent: 100,
    },
    {
      uid: 'f3',
      status: 'uploading',
      size: 99999,
      name: 'f3.jpg',
      percent: 77,
    },
  ];

  return (
    <Upload
      action="https://mock.apifox.cn/m1/1599304-0-default/upload"
      defaultFiles={defaultFiles}
      onError={onError}
      onSuccess={onSuccess}
      onChange={onChange}
      beforeUpload={rename}
    ></Upload>
  );
};

export default App;
