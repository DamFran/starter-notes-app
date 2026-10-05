import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';

function NotFoundPage() {
  const { locale } = useContext(LocaleContext);

  return (
    <section>
      <h2>404</h2>
      <p>{locale === 'id' ? 'Halaman tidak ditemukan' : 'Page not found'}</p>
      <p style={{ marginTop: '16px' }}>
        <Link to="/">{locale === 'id' ? 'Kembali ke Halaman Utama' : 'Back to Home'}</Link>
      </p>
    </section>
  );
}

export default NotFoundPage;
