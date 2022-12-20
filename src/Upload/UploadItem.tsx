import classNames from 'classnames';
import Tooltip from '../Tooltip';
import { FC, useEffect, useState } from 'react';
import Icon from '../Icon';
import { UploadItemProps } from '../interface';
import Progress from './progress';

const UploadItem: FC<UploadItemProps> = (props) => {
  const { type, file, onRemove, onPreview } = props;
  const [pic, setPic] = useState('');

  useEffect(() => {
    if (file?.url) {
      setPic(file.url);
    }
    if (file?.raw) {
      const URL = window.URL || window.webkitURL;
      const pic = URL.createObjectURL(file.raw);
      setPic(pic);
    }
  }, [file]);

  const clas = classNames('cat-upload-card', {
    [`cat-upload-${type}`]: type,
  });

  const Success = <img src={pic} alt="image" />;
  const Add = <Icon name="add" size="30" color="#d9d9d9" />;
  const Err = (
    <>
      {pic && <img src={pic} alt="image" />}
      {!pic && <Icon name="picture" size="30" color="#ff4d4f" />}
      {!pic && <span>Image.png</span>}
    </>
  );

  const Uplaoding = (
    <>
      <span>Uploading...</span>
      <Progress percent={file?.percent} />
    </>
  );

  const preview = () => {
    if (onPreview && file && type === 'success') {
      onPreview(file);
    }
  };

  const dele = () => {
    if (onRemove && file) {
      onRemove(file);
    }
  };

  const Hover = (
    <div className="cat-upload-hover">
      <Icon
        className="cat-upload-icon"
        name="browse"
        color="#999"
        hoverColor={type === 'success' ? '#fff' : ''}
        size="26"
        onClick={preview}
      />
      <Icon
        className="cat-upload-icon"
        name="ashbin"
        color="#999"
        hoverColor="#fff"
        size="26"
        onClick={dele}
      />
    </div>
  );

  return (
    <Tooltip text={type === 'error' ? '上传错误' : ''}>
      <div className={clas}>
        <div className="cat-upload-item-container">
          {(type === 'success' || type === 'error') && Hover}
          {type === 'add' && Add}
          {type === 'success' && Success}
          {type === 'uploading' && Uplaoding}
          {type === 'error' && Err}
        </div>
      </div>
    </Tooltip>
  );
};

export default UploadItem;
