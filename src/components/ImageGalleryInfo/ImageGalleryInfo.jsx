import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';

import Spinner from '../Loader/Loader';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageErrorView from '../ImageErrorView/ImageErrorView';

import API from '../../services/Api';

import { useState, useEffect } from 'react';

import '../../css/styles.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function ImageGalleryInfo({ query }) {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus(Status.PENDING);
    fetchImgGallery();
    setStatus(Status.RESOLVED);
  }, [query, page]);

  useEffect(() => {
    const resetPage = (newQuery) => {
      if (newQuery !== query) {
        setPage(1);
        setImages([]);
      }
    };
    resetPage();
  }, [query]);

  const fetchImgGallery = () => {
    API.fetchImages(query, page)
      .then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        scrollPageToBottom();
        if (newImages.length === 0) {
          throw new Error('Hmm...Nothing here. Try another search.');
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  };

  const scrollPageToBottom = () => {
    if (page !== 1) {
      window.scrollTo({
        left: 0,
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  const onLoadMore = () => {
    setPage((page) => page + 1);
  };

  if (status === Status.IDLE) {
    return (
      <div style={{ textAlign: 'center' }}>
        Please enter a search term to begin your search...
      </div>
    );
  }

  if (status === Status.PENDING) {
    return <Spinner />;
  }

  if (status === Status.REJECTED) {
    return <ImageErrorView message={error.message} />;
  }

  if (status === Status.RESOLVED) {
    return (
      <>
        <ImageGallery images={images} />
        {images.length !== 0 && <Button onClick={onLoadMore} />}
      </>
    );
  }
}

ImageGalleryInfo.propTypes = {
  query: PropTypes.string.isRequired,
};
