import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { getArchivedNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function ArchivePage() {
  const { locale } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyword = searchParams.get('title') || '';

  useEffect(() => {
    getArchivedNotes().then(({ error, data }) => {
      if (!error) {
        setNotes(data);
      }
      setLoading(false);
    });
  }, []);

  const onKeywordChange = (newKeyword) => {
    setSearchParams(newKeyword ? { title: newKeyword } : {});
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <section className="archives-page">
      <h2>{locale === 'id' ? 'Catatan Arsip' : 'Archived Notes'}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChange} />
      {loading ? (
        <section className="notes-list-empty">
          <p className="notes-list__empty-message">
            {locale === 'id' ? 'Memuat catatan...' : 'Loading notes...'}
          </p>
        </section>
      ) : (
        <NotesList notes={filteredNotes} />
      )}
    </section>
  );
}

export default ArchivePage;
