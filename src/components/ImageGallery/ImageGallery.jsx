import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

import '../css/styles.css';

export default function ImageGallery({ images }) {
  return (
    <>
      <ul className="ImageGallery">
        {images.map((element, id) => (
          <ImageGalleryItem
            id={id}
            key={element.id}
            src={element.webformatURL}
            largeImageURL={element.largeImageURL}
            alt={element.tags}
          />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
