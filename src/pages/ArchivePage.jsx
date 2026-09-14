import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getArchivedNotes } from '../utils/local-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function ArchivePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes] = useState(() => getArchivedNotes());
  const keyword = searchParams.get('title') || '';

  const onKeywordChange = (newKeyword) => {
    setSearchParams(newKeyword ? { title: newKeyword } : {});
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archives-page">
      <h2>Catatan Arsip</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      <NotesList notes={filteredNotes} />
    </section>
  );
}

export default ArchivePage;
