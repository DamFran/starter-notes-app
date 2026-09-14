import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <section>
      <h2>404</h2>
      <p>Halaman tidak ditemukan</p>
      <p style={{ marginTop: '16px' }}>
        <Link to="/">Kembali ke Halaman Utama</Link>
      </p>
    </section>
  );
}

export default NotFoundPage;
