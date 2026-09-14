import React from 'react';

function SearchBar({ keyword, keywordChange }) {
  return (
    <section className="search-bar">
      <input
        type="text"
        placeholder="Cari berdasarkan judul ..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </section>
  );
}

export default SearchBar;
