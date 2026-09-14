import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/local-data';

function AddPage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const onSaveHandler = () => {
    if (!title && !body) return;
    addNote({ title, body });
    navigate('/');
  };

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder="Catatan rahasia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder="Sebenarnya saya adalah ..."
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setBody(e.currentTarget.innerText)}
        />
      </div>
      <div className="add-new-page__action">
        <button
          className="action"
          type="button"
          title="Simpan"
          onClick={onSaveHandler}
        >
          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </button>
      </div>
    </section>
  );
}

export default AddPage;
