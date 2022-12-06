/**
 * title: 通用
 * desc: 最简单的用法。
 */

import { Upload } from 'catd';

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

  return (
    <Upload
      action="https://mock.apifox.cn/m1/1599304-0-default/upload"
      onError={onError}
      onSuccess={onSuccess}
      onChange={onChange}
      beforeUpload={rename}
    ></Upload>
  );
};

export default App;
