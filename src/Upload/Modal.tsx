import { forwardRef, useImperativeHandle, useState } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { ModalApi, UploadFile } from '../interface';

interface ModalProps {}

const Modal = forwardRef<ModalApi, ModalProps>((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [pic, setPic] = useState('');

  const show = (file: UploadFile) => {
    setVisible(true);
    if (file.url) {
      setPic(file.url);
    }
    if (file.raw) {
      const URL = window.URL || window.webkitURL;
      const pic = URL.createObjectURL(file.raw);
      setPic(pic);
    }
  };

  const hide = () => {
    setVisible(false);
    setPic('');
  };

  useImperativeHandle(ref, () => ({ show }));

  if (!visible) return null;

  return ReactDom.createPortal(
    <Container onClick={hide}>
      <div className="card" onClick={(e) => e.stopPropagation()}>
        <img src={pic} />
      </div>
    </Container>,
    document.body,
  );
});

export default Modal;

var Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  .card {
    width: 50%;
    background-color: #fff;
    border-radius: 12px;
    padding: 18px;
    img {
      width: 100%;
    }
  }
`;
