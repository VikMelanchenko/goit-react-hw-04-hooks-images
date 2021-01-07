import { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Loader/Loader';
import API from '../../services/Api';
import Button from '../Button/Button';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageErrorView from '../ImageErrorView/ImageErrorView';
import PropTypes from 'prop-types';

import '../css/styles.css';

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

    API.fetchImages(query, page)
      .then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setStatus(Status.RESOLVED);
        scrollToBottom();
        if (newImages.length === 0) {
          throw new Error('Hmm...Nothing here. Try another search.');
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
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

  const onLoadMore = () => {
    setPage((page) => page + 1);
  };

  const scrollToBottom = (currentPage) => {
    if (currentPage !== page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
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
        <Button onClick={onLoadMore} />
      </>
    );
  }
}

ImageGalleryInfo.propTypes = {
  query: PropTypes.string.isRequired,
};
