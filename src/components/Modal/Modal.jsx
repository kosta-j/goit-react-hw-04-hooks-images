import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  });

  function handleKeydown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function handleBackdropClick(e) {
    if (e.currentTarget === e.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
