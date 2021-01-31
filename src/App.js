import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGalleryInfo from './components/ImageGalleryInfo/ImageGalleryInfo';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (query) => {
    setQuery(query);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      <ImageGalleryInfo query={query} />
    </div>
  );
}
