import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import Dogs from '../Assets/dogs.svg?react';

const Header = () => {
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
