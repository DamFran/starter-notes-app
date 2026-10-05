import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { register } from '../utils/network-data';

function RegisterPage() {
  const { locale } = useContext(LocaleContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const onRegisterHandler = async () => {
    if (password !== confirmPassword) {
      alert(locale === 'id' ? 'Password dan konfirmasi password harus sama.' : 'Password and password confirm must be the same.');
      return;
    }

    const { error } = await register({ name, email, password });
    if (!error) {
      navigate('/');
    }
  };

  return (
    <section className="register-page">
      <h2>{locale === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register account.'}</h2>
      <div className="input-register">
        <label htmlFor="name">{locale === 'id' ? 'Nama' : 'Name'}</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="confirmPassword">{locale === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" onClick={onRegisterHandler}>
          Register
        </button>
      </div>
      <p>
        {locale === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
        <Link to="/">{locale === 'id' ? 'Login di sini' : 'Login here'}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
