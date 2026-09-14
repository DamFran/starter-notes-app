import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/local-data';
import { showFormattedDate } from '../utils';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchedNote = getNote(id);
    setNote(fetchedNote || null);
    setLoading(false);
  }, [id]);

  if (loading) {
    return null;
  }

  if (!note) {
    return (
      <section className="detail-page">
        <p>Catatan tidak ditemukan!</p>
      </section>
    );
  }

  const onArchiveHandler = () => {
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    navigate('/');
  };

  const onDeleteHandler = () => {
    deleteNote(id);
    navigate('/');
  };

  return (
    <section className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>
      <div className="detail-page__action">
        <button
          className="action"
          type="button"
          title={note.archived ? 'Aktifkan' : 'Arsipkan'}
          onClick={onArchiveHandler}
        >
          {note.archived ? (
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
              <path d="M4 14h6m-3-3v6m14-5v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8m2-4h14a2 2 0 0 1 2 2v2H3V6a2 2 0 0 1 2-2z" />
            </svg>
          ) : (
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
              <path d="M21 8v13H3V8M1 3h22v5H1zM10 12h4" />
            </svg>
          )}
        </button>
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={onDeleteHandler}
        >
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
