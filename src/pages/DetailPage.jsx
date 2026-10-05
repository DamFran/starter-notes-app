import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils';

function DetailPage() {
  const { locale } = useContext(LocaleContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote(id).then(({ error, data }) => {
      if (!error) {
        setNote(data);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <section className="detail-page">
        <p>{locale === 'id' ? 'Memuat catatan...' : 'Loading notes...'}</p>
      </section>
    );
  }

  if (!note) {
    return (
      <section className="detail-page">
        <p>{locale === 'id' ? 'Catatan tidak ditemukan!' : 'Note not found!'}</p>
      </section>
    );
  }

  const onArchiveHandler = async () => {
    if (note.archived) {
      await unarchiveNote(id);
    } else {
      await archiveNote(id);
    }
    navigate('/');
  };

  const onDeleteHandler = async () => {
    await deleteNote(id);
    navigate('/');
  };

  const archiveTitle = note.archived
    ? (locale === 'id' ? 'Aktifkan' : 'Unarchive')
    : (locale === 'id' ? 'Arsipkan' : 'Archive');
  const deleteTitle = locale === 'id' ? 'Hapus' : 'Delete';

  return (
    <section className="detail-page">
      <h2 className="detail-page__title">{note.title}</h2>
      <p className="detail-page__createdAt">{showFormattedDate(note.createdAt)}</p>
      <div className="detail-page__body">{note.body}</div>
      <div className="detail-page__action">
        <button
          className="action"
          type="button"
          title={archiveTitle}
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
          title={deleteTitle}
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
