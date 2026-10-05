import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LocaleContext from '../contexts/LocaleContext';
import ToggleLocale from './ToggleLocale';
import ToggleTheme from './ToggleTheme';

function Navigation({ logout, name }) {
  const { locale } = useContext(LocaleContext);

  return (
    <nav className="navigation">
      <ul>
        {logout && (
          <li>
            <Link to="/archives">{locale === 'id' ? 'Arsip' : 'Archived'}</Link>
          </li>
        )}
        <li>
          <ToggleLocale />
        </li>
        <li>
          <ToggleTheme />
        </li>
        {logout && (
          <li>
            <button className="button-logout" type="button" onClick={logout} title="Logout">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" width="24" height="24">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              {name}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
