import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { addNote } from '../utils/network-data';

function AddPage() {
  const { locale } = useContext(LocaleContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const onSaveHandler = async () => {
    if (!title && !body) return;
    const { error } = await addNote({ title, body });
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="add-new-page">
      <div className="add-new-page__input">
        <input
          className="add-new-page__input__title"
          type="text"
          placeholder={locale === 'id' ? 'Catatan rahasia' : 'Secret notes'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div
          className="add-new-page__input__body"
          data-placeholder={locale === 'id' ? 'Sebenarnya saya adalah ...' : 'Actually I am ...'}
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setBody(e.currentTarget.innerText)}
        />
      </div>
      <div className="add-new-page__action">
        <button
          className="action"
          type="button"
          title={locale === 'id' ? 'Simpan' : 'Save'}
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
