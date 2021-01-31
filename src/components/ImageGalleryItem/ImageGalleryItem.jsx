import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';

import { useState } from 'react';

import '../../css/styles.css';

export default function ImageGalleryItem({ src, alt, largeImageURL }) {
  const [showModal, setShowModal] = useState(null);

  const toggleModal = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <li className="ImageGalleryItem" onClick={toggleModal}>
      <img src={src} alt={alt} className="ImageGalleryItem-image" />
      {showModal && (
        <Modal onClose={toggleModal} src={largeImageURL} alt={alt} />
      )}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
