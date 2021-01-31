import PropTypes from 'prop-types';

import { toast } from 'react-toastify';

import { useState } from 'react';

import '../../css/styles.css';

export default function SearchForm({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (query.trim() === '') {
      toast.error('Please enter a valid query string');
      return;
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <header className="Searchbar">
      <form onSubmit={handleSubmit} className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </form>
    </header>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
