import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import FetchImages from './components/FetchImages/FetchImages';

export default function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = (query) => {
    setQuery(query);
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} />
      <FetchImages query={query} />
    </div>
  );
}
