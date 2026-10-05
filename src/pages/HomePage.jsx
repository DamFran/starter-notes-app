import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { getActiveNotes } from '../utils/network-data';
import SearchBar from '../components/SearchBar';
import NotesList from '../components/NotesList';

function HomePage() {
  const { locale } = useContext(LocaleContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const keyword = searchParams.get('title') || '';

  useEffect(() => {
    getActiveNotes().then(({ error, data }) => {
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
    <section className="homepage">
      <h2>{locale === 'id' ? 'Catatan Aktif' : 'Active Notes'}</h2>
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
      <div className="homepage__action">
        <Link to="/notes/new" className="action" title={locale === 'id' ? 'Tambah Catatan' : 'Add Note'}>
          +
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
