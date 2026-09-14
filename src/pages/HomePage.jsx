import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getActiveNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes] = useState(() => getActiveNotes());
  const keyword = searchParams.get('title') || '';

  const onKeywordChange = (newKeyword) => {
    setSearchParams(newKeyword ? { title: newKeyword } : {});
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="homepage">
      <h2>Catatan Aktif</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      <NotesList notes={filteredNotes} />
      <div className="homepage__action">
        <Link to="/notes/new" className="action" title="Tambah Catatan">
          +
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
