import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import { login } from '../utils/network-data';

function LoginPage({ loginSuccess }) {
  const { locale } = useContext(LocaleContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHandler = async () => {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <section className="login-page">
      <h2>{locale === 'id' ? 'Yuk, login untuk menggunakan aplikasi.' : 'Login to use app, please.'}</h2>
      <div className="input-login">
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
        <button type="button" onClick={onLoginHandler}>
          Login
        </button>
      </div>
      <p>
        {locale === 'id' ? 'Belum punya akun? ' : "Don't have an account? "}
        <Link to="/register">{locale === 'id' ? 'Daftar di sini' : 'Register here'}</Link>
      </p>
    </section>
  );
}

export default LoginPage;
