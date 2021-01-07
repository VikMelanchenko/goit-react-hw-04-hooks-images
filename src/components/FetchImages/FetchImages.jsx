import { useState, useEffect } from 'react';
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
      // Первый рендер, query это пустая строка, не делаем fetch
      return;
    }
    setStatus(Status.PENDING);

    API.fetchImages(query, page)
      .then((newImages) => {
        setImages((prevImages) => [...prevImages, ...newImages]);
        setPage(page);
        setStatus(Status.RESOLVED);
        if (newImages.length === 0) {
          throw new Error('Hmm...Nothing here. Try another search.');
        }
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [query, page]);

  if (page !== 1) {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  if (status === Status.IDLE) {
    return <div style={{ textAlign: 'center' }}> Please enter search item</div>;
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
        <Button onClick={() => setPage((prevPage) => prevPage + 1)} />
      </>
    );
  }
}

//   // обновляет поиск при вводенового значения в input + обновляет поиск с первой страницы
//   if (prevQuery !== nextQuery) {
//     this.setState({ page: 1, images: [] });
//   }

//   // scroll вниз
//   if (prevState.page !== this.state.page) {
//     window.scrollTo({
//       top: document.documentElement.scrollHeight,
//       behavior: 'smooth',
//     });
//   }
//   }
// }