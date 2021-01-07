import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import '../css/styles.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') {
        props.onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      props.onClose();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">
        <img src={props.src} alt={props.alt} width={900}></img>
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  src: PropTypes.string.isRequired,
};
