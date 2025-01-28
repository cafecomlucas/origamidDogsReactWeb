import React from 'react';
import styles from './Account.module.css';
import { UserContext } from '../../UserContext';

const Account = () => {
  const { userData } = React.useContext(UserContext);

  return (
    <section className={styles.account}>
      Bem vindo <strong>{userData.username}</strong>
    </section>
  );
};

export default Account;
