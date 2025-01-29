import React from 'react';
import styles from './Account.module.css';
import { UserContext } from '../../UserContext';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const { userData, isUserLoggedIn } = React.useContext(UserContext);

  if (!isUserLoggedIn) return <Navigate to="/login" />;
  return (
    <section className={styles.account}>
      Bem vindo <strong>{userData.username}</strong>
    </section>
  );
};

export default Account;
