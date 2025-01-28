import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Dogs from '../Assets/dogs.svg?react';
import React from 'react';
import { ContextUser } from '../ContextUser';

const Header = () => {
  const user = React.useContext(ContextUser);
  console.log(user);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        <Link className={styles.login} to="login">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default Header;
