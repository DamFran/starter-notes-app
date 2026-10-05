import React, { useContext } from 'react';
import LocaleContext from '../contexts/LocaleContext';
import NoteItem from './NoteItem';

function NotesList({ notes }) {
  const { locale } = useContext(LocaleContext);

  if (!notes || notes.length === 0) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty-message">
          {locale === 'id' ? 'Tidak ada catatan' : 'No notes'}
        </p>
      </section>
    );
  }

  return (
    <section className="notes-list">
      {notes.map((note) => (
        <NoteItem key={note.id} {...note} />
      ))}
    </section>
  );
}

export default NotesList;
